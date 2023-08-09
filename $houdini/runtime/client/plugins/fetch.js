import { ArtifactKind, DataSource } from "../../lib/types";
const fetch = (target) => {
  return () => {
    return {
      async network(ctx, { client, initialValue, resolve, marshalVariables }) {
        if (ctx.artifact.kind === ArtifactKind.Fragment) {
          return resolve(ctx, initialValue);
        }
        const fetch2 = ctx.fetch ?? globalThis.fetch;
        const fetchParams = {
          name: ctx.name,
          text: ctx.text,
          hash: ctx.hash,
          variables: marshalVariables(ctx)
        };
        let fetchFn = defaultFetch(client.url, ctx.fetchParams);
        if (target) {
          if (typeof target === "string") {
            fetchFn = defaultFetch(target, ctx.fetchParams);
          } else {
            fetchFn = target;
          }
        }
        const result = await fetchFn({
          fetch: (url, args) => {
            const newArgs = handleMultipart(fetchParams, args) ?? args;
            return fetch2(url, newArgs);
          },
          metadata: ctx.metadata,
          session: ctx.session || {},
          ...fetchParams
        });
        resolve(ctx, {
          fetching: false,
          variables: ctx.variables ?? {},
          data: result.data,
          errors: !result.errors || result.errors.length === 0 ? null : result.errors,
          partial: false,
          stale: false,
          source: DataSource.Network
        });
      }
    };
  };
};
const defaultFetch = (url, params) => {
  if (!url) {
    throw new Error(
      "Could not find configured client url. Please specify one in your HoudiniClient constructor."
    );
  }
  return async ({ fetch: fetch2, name, text, variables }) => {
    const result = await fetch2(url, {
      method: "POST",
      body: JSON.stringify({ operationName: name, query: text, variables }),
      ...params,
      headers: {
        Accept: "application/graphql+json, application/json",
        "Content-Type": "application/json",
        ...params?.headers
      }
    });
    return await result.json();
  };
};
function handleMultipart(params, args) {
  const { files } = extractFiles({
    variables: params.variables
  });
  if (files.size) {
    const req = args;
    let headers = {};
    if (req?.headers) {
      const filtered = Object.entries(req?.headers).filter(([key, value]) => {
        return !(key.toLowerCase() == "content-type" && value.toLowerCase() == "application/json");
      });
      headers = Object.fromEntries(filtered);
    }
    const form = new FormData();
    if (args && args?.body) {
      form.set("operations", args?.body);
    } else {
      form.set(
        "operations",
        JSON.stringify({
          operationName: params.name,
          query: params.text,
          variables: params.variables
        })
      );
    }
    const map = {};
    let i = 0;
    files.forEach((paths) => {
      map[++i] = paths;
    });
    form.set("map", JSON.stringify(map));
    i = 0;
    files.forEach((paths, file) => {
      form.set(`${++i}`, file, file.name);
    });
    return { ...req, headers, body: form };
  }
}
function isExtractableFile(value) {
  return typeof File !== "undefined" && value instanceof File || typeof Blob !== "undefined" && value instanceof Blob;
}
function extractFiles(value) {
  if (!arguments.length)
    throw new TypeError("Argument 1 `value` is required.");
  const clones = /* @__PURE__ */ new Map();
  const files = /* @__PURE__ */ new Map();
  function recurse(value2, path, recursed) {
    if (isExtractableFile(value2)) {
      const filePaths = files.get(value2);
      filePaths ? filePaths.push(path) : files.set(value2, [path]);
      return null;
    }
    const valueIsList = Array.isArray(value2) || typeof FileList !== "undefined" && value2 instanceof FileList;
    const valueIsPlainObject = isPlainObject(value2);
    if (valueIsList || valueIsPlainObject) {
      let clone = clones.get(value2);
      const uncloned = !clone;
      if (uncloned) {
        clone = valueIsList ? [] : value2 instanceof Object ? {} : /* @__PURE__ */ Object.create(null);
        clones.set(value2, clone);
      }
      if (!recursed.has(value2)) {
        const pathPrefix = path ? `${path}.` : "";
        const recursedDeeper = new Set(recursed).add(value2);
        if (valueIsList) {
          let index = 0;
          for (const item of value2) {
            const itemClone = recurse(item, pathPrefix + index++, recursedDeeper);
            if (uncloned)
              clone.push(itemClone);
          }
        } else
          for (const key in value2) {
            const propertyClone = recurse(value2[key], pathPrefix + key, recursedDeeper);
            if (uncloned)
              clone[key] = propertyClone;
          }
      }
      return clone;
    }
    return value2;
  }
  return {
    clone: recurse(value, "", /* @__PURE__ */ new Set()),
    files
  };
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
export {
  extractFiles,
  fetch,
  isExtractableFile
};
