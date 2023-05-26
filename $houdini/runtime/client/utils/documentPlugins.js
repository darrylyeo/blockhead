const documentPlugin = (kind, source) => {
  return () => {
    const sourceHandlers = source();
    const enterWrapper = (handler) => {
      return !handler ? void 0 : (ctx, handlers) => {
        if (ctx.artifact.kind !== kind) {
          return handlers.next(ctx);
        }
        return handler(ctx, handlers);
      };
    };
    const exitWrapper = (handler) => {
      return !handler ? void 0 : (ctx, handlers) => {
        if (ctx.artifact.kind !== kind) {
          return handlers.resolve(ctx);
        }
        return handler(ctx, handlers);
      };
    };
    return {
      start: enterWrapper(sourceHandlers.start),
      network: enterWrapper(sourceHandlers.network),
      afterNetwork: exitWrapper(sourceHandlers.afterNetwork),
      end: exitWrapper(sourceHandlers.end),
      catch: sourceHandlers.catch ? (ctx, handlers) => sourceHandlers.catch(ctx, handlers) : void 0,
      cleanup: (...args) => sourceHandlers.cleanup?.(...args)
    };
  };
};
export {
  documentPlugin
};
