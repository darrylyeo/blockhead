import { getCache } from "$houdini/runtime";
import { deepEquals } from "$houdini/runtime/lib/deepEquals";
import { executeQuery } from "$houdini/runtime/lib/network";
import { getCurrentClient } from "../../network";
import { getSession } from "../../session";
import { fetchParams } from "../query";
import { countPage, missingPageSizeError } from "./pageInfo";
function offsetHandlers({
  artifact,
  queryVariables: extraVariables,
  fetch,
  getValue,
  setFetching,
  storeName,
  getConfig
}) {
  let getOffset = () => artifact.refetch?.start || countPage(artifact.refetch.path, getValue()) || artifact.refetch.pageSize;
  let currentOffset = getOffset() ?? 0;
  return {
    loadNextPage: async ({
      limit,
      offset,
      fetch: fetch2,
      metadata
    } = {}) => {
      const config = await getConfig();
      offset ??= currentOffset || getOffset();
      const queryVariables = {
        ...await extraVariables(),
        offset
      };
      if (limit || limit === 0) {
        queryVariables.limit = limit;
      }
      if (!queryVariables.limit && !artifact.refetch.pageSize) {
        throw missingPageSizeError("loadNextPage");
      }
      const { result } = await executeQuery({
        client: await getCurrentClient(),
        artifact,
        variables: queryVariables,
        session: await getSession(),
        cached: false,
        config,
        setFetching,
        fetch: fetch2,
        metadata
      });
      getCache().write({
        selection: artifact.selection,
        data: result.data,
        variables: queryVariables,
        applyUpdates: true
      });
      const pageSize = queryVariables.limit || artifact.refetch.pageSize;
      currentOffset = offset + pageSize;
      setFetching(false);
    },
    async fetch(args) {
      const { params } = await fetchParams(artifact, storeName, args);
      const { variables } = params ?? {};
      const extra = await extraVariables();
      if (variables && !deepEquals(extra, variables)) {
        return fetch.call(this, params);
      }
      const count = currentOffset || getOffset();
      const queryVariables = {
        ...extra
      };
      if (!artifact.refetch.pageSize || count > artifact.refetch.pageSize) {
        queryVariables.limit = count;
      }
      const result = await fetch.call(this, {
        ...params,
        variables: queryVariables
      });
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
  offsetHandlers
};
