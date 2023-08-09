const fetchParams = (fn = () => ({})) => () => ({
  beforeNetwork(ctx, { next, marshalVariables }) {
    next({
      ...ctx,
      fetchParams: fn({
        config: ctx.config,
        policy: ctx.policy,
        metadata: ctx.metadata,
        session: ctx.session,
        stuff: ctx.stuff,
        document: ctx.artifact,
        variables: marshalVariables(ctx),
        text: ctx.text,
        hash: ctx.hash
      })
    });
  }
});
export {
  fetchParams
};
