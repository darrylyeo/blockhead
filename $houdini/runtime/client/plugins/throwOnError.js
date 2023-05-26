import { ArtifactKind } from "../../lib";
const throwOnError = ({ operations, error }) => () => {
  const all = operations.includes("all");
  const throwOnKind = (kind) => all || {
    [ArtifactKind.Query]: operations.includes("query"),
    [ArtifactKind.Mutation]: operations.includes("mutation"),
    [ArtifactKind.Fragment]: false,
    [ArtifactKind.Subscription]: operations.includes("subscription")
  }[kind];
  return {
    async end(ctx, { value, resolve }) {
      if (value.errors && value.errors.length > 0 && throwOnKind(ctx.artifact.kind)) {
        const result = await (error ?? defaultErrorFn)(value.errors, ctx);
        throw result;
      }
      resolve(ctx);
    }
  };
};
const defaultErrorFn = async (errors) => new Error(errors.map((error) => error.message).join(". ") + ".");
export {
  throwOnError
};
