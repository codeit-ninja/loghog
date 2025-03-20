import { createLogger, format, transports } from 'winston'
const { combine, timestamp } = format

export const logger = createLogger({
	level: 'info',
	format: combine(timestamp()),
	transports: [
		new transports.Http({
			host: 'localhost',
			port: 5173,
			path: `/api/log?name=${encodeURIComponent('debug.log')}&group=${encodeURIComponent('Server #2')}`,
			ssl: false
		})
		// new winston.transports.File({ filename: 'error.log', level: 'error' }),
		// new winston.transports.File({ filename: 'combined.log' })
	]
})
