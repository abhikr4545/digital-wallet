import * as winston from 'winston';
import LogstashTransport from 'winston-logstash/lib/winston-logstash-latest.js';

const logstashTransport = new LogstashTransport({
  host: 'localhost',
  port: 5044
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    logstashTransport,
    new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint(),
      ),
    }),
  ],
});