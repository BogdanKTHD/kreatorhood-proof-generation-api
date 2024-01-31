// winston logger for logging errors and info level logs into error.log and combined.log

import { createLogger, format, transports } from 'winston'

const appInsights = require('applicationinsights')

appInsights
  .setup()
  .setAutoCollectRequests(true)
  .setAutoCollectConsole(true, true)
  .setAutoCollectDependencies(false)
  .start()

const options = {
  exitOnError: false,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg) => {
      return `${msg.timestamp} [${msg.level}][${msg.context}] - ${msg.message}`
    })
  ),
  transports: [new transports.Console({ level: 'debug' })] // alert > error > warning > notice > info > debug
}
format.combine(
  format.colorize({
    all: true
  }),
  format.label({
    label: '[PROOF-GEN-API]'
  }),
  format.timestamp({
    format: 'YY-MM-DD HH:mm:ss'
  }),
  format.printf(
    info => `${info.timestamp} - ${info.level} : ${info.message}`
  )
)

const logger = createLogger(options)

export default logger
