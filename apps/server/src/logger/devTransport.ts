/** Pino transport for local development. Only call this in dev, the target isn't part of the build. */
export const devTransport = () => ({
  target: new URL('./prettyTransport.mjs', import.meta.url).href,
});
