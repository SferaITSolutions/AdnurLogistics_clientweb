const isDev = process.env.NEXT_PUBLIC_DEV === 'true';

// custom log
export const logger = {
  log: (...args: any) => {
    if (isDev) console.log('[LOG]', ...args);
  },
  warn: (...args: any) => {
    if (isDev) console.warn('[WARN]', ...args);
  },
  error: (...args: any) => {
    if (isDev) console.error('[ERROR]', ...args);
  },
  info: (...args: any) => {
    if (isDev) console.info('[INFO]', ...args);
  },
};
