/** Separate development output keeps local production verification reproducible. */
const config = (phase) => ({
  distDir: phase === "phase-development-server" ? ".next-dev" : ".next",
});
export default config;
