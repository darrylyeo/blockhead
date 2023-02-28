async function getCurrentClient() {
  return (await import("../../../../src/api/ens/client.ts")).default;
}
export {
  getCurrentClient
};
