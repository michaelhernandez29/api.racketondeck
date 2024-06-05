import pino from 'pino';

const logger = pino({
  transport: {
    options: {
      colorize: true,
    },
    target: 'pino-pretty',
  },
});

export default logger;
