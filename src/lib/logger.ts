import { createLogger, format, transports } from 'winston'
const { combine, timestamp } = format

// export const httpTransporter = new transports.Http({
// 	host: 'monitor.codeit.website',
// 	port: 443,
// 	path: `/api/log?name=${encodeURIComponent('debug.log')}&group=${encodeURIComponent('Server #1')}`,
// 	ssl: true
// })

export const httpTransporter = new transports.Http({
	host: 'localhost',
	port: 5173,
	path: `/api/log?name=${encodeURIComponent('debug.log')}&group=${encodeURIComponent('Server #1')}`
})

export const logger = createLogger({
	level: 'info',
	format: combine(timestamp()),
	silent: false,
	transports: [
		httpTransporter
		// new winston.transports.File({ filename: 'error.log', level: 'error' }),
		// new winston.transports.File({ filename: 'combined.log' })
	]
})

httpTransporter.on('warn', (e) => console.log('warning! ' + e))
