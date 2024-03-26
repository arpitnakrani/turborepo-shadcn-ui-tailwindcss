export const PinoLogger = {
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
        },
      },
    },
  }