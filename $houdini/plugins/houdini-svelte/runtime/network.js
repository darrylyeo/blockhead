async function getCurrentClient() {
  return (await import("../../../../src/data/ens/client.ts")).default;
}
export {
  getCurrentClient
};
