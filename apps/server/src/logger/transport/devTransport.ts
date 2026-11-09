/** Pino transport for local development. Created to enable more colors in pino logs. */
export const devTransport = () => ({
  target: new URL('./prettyTransport.mjs', import.meta.url).href,
});
