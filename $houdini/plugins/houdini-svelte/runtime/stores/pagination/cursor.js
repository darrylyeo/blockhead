import { getCache } from "$houdini/runtime";
import { siteURL } from "$houdini/runtime/lib/constants";
import { deepEquals } from "$houdini/runtime/lib/deepEquals";
import { executeQuery } from "$houdini/runtime/lib/network";
import { writable } from "svelte/store";
import { getCurrentClient } from "../../network";
import { getSession } from "../../session";
import { fetchParams } from "../query";
import { countPage, extractPageInfo, missingPageSizeError } from "./pageInfo";
function cursorHandlers({
  artifact,
  queryVariables: extraVariables,
  setFetching,
  fetch,
  storeName,
  getValue,
  getConfig
}) {
  const pageInfo = writable(extractPageInfo(getValue(), artifact.refetch.path));
  const loadPage = async ({
    pageSizeVar,
    input,
    functionName,
    metadata = {},
    fetch: fetch2
  }) => {
    const config = await getConfig();
    const client = await getCurrentClient();
    const loadVariables = {
      ...await extraVariables?.(),
      ...input
    };
    if (!loadVariables[pageSizeVar] && !artifact.refetch.pageSize) {
      throw missingPageSizeError(functionName);
    }
    const { result } = await executeQuery({
      client,
      artifact,
      variables: loadVariables,
      session: await getSession(),
      setFetching,
      cached: false,
      config,
      fetch: fetch2,
      metadata
    });
    const resultPath = [...artifact.refetch.path];
    if (artifact.refetch.embedded) {
      const { targetType } = artifact.refetch;
      if (!config.types?.[targetType]?.resolve) {
        throw new Error(
          `Missing type resolve configuration for ${targetType}. For more information, see ${siteURL}/guides/pagination#paginated-fragments`
        );
      }
      resultPath.unshift(config.types[targetType].resolve.queryField);
    }
    pageInfo.set(extractPageInfo(result.data, resultPath));
    getCache().write({
      selection: artifact.selection,
      data: result.data,
      variables: loadVariables,
      applyUpdates: true
    });
    setFetching(false);
  };
  return {
    loadNextPage: async ({
      first,
      after,
      fetch: fetch2,
      metadata
    } = {}) => {
      const currentPageInfo = extractPageInfo(getValue(), artifact.refetch.path);
      if (!currentPageInfo.hasNextPage) {
        return;
      }
      const input = {
        after: after ?? currentPageInfo.endCursor
      };
      if (first) {
        input.first = first;
      }
      return await loadPage({
        pageSizeVar: "first",
        functionName: "loadNextPage",
        input,
        fetch: fetch2,
        metadata
      });
    },
    loadPreviousPage: async ({
      last,
      before,
      fetch: fetch2,
      metadata
    } = {}) => {
      const currentPageInfo = extractPageInfo(getValue(), artifact.refetch.path);
      if (!currentPageInfo.hasPreviousPage) {
        return;
      }
      const input = {
        before: before ?? currentPageInfo.startCursor
      };
      if (last) {
        input.last = last;
      }
      return await loadPage({
        pageSizeVar: "last",
        functionName: "loadPreviousPage",
        input,
        fetch: fetch2,
        metadata
      });
    },
    pageInfo,
    async fetch(args) {
      const { params } = await fetchParams(artifact, storeName, args);
      const { variables } = params ?? {};
      const extra = await extraVariables();
      const queryVariables = {
        ...extra,
        ...variables
      };
      if (variables && !deepEquals(extra, variables)) {
        const result2 = await fetch({
          ...params,
          then(data) {
            pageInfo.set(extractPageInfo(data, artifact.refetch.path));
          }
        });
        return result2;
      }
      const count = countPage(artifact.refetch.path.concat("edges"), getValue()) || artifact.refetch.pageSize;
      if (count && count > artifact.refetch.pageSize) {
        queryVariables[artifact.refetch.update === "prepend" ? "last" : "first"] = count;
      }
      const result = await fetch({
        ...params,
        variables: queryVariables
      });
      pageInfo.set(extractPageInfo(result.data, artifact.refetch.path));
      setFetching(false);
      return {
        data: result.data,
        variables: queryVariables,
        fetching: false,
        partial: result.partial,
        errors: null,
        source: result.source
      };
    }
  };
}
export {
  cursorHandlers
};
