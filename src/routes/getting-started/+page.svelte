<script lang="ts">
	import { Code } from '$lib/components/ui/code'
	import { H } from '$lib/components/ui/heading'
</script>

<div class="w-full overflow-auto">
	<div class="prose dark:prose-white max-w-3xl p-8">
		<H level={1}>Getting Started with LogHog</H>
		<p>
			Logging is essential for tracking application behavior, debugging issues, and monitoring
			performance. In this guide, we will set up <a
				href="https://github.com/winstonjs/winston"
				target="_blank">Winston</a
			>, a popular logging library for Node.js, and configure it to send logs to our LogHog server.
		</p>

		<H level={2}>Step 1: Installing Winston</H>
		<p>
			First, ensure that Winston is installed in your project. If you haven't installed it yet, run:
		</p>
		<Code language="bash">{`npm install winston`}</Code>

		<H level={2}>Step 2: Configuring the Logger</H>
		<p>
			Next, create a logger instance using Winston. We'll configure it to send logs via HTTP to a
			remote logging server.
		</p>

		<Code>
			{`import { createLogger, format, transports } from 'winston'
const { combine, timestamp } = format

export const logger = createLogger({
    level: 'info', // Log level: can be 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
    format: combine(
        timestamp() // Adds a timestamp to each log entry
    ),
    transports: [
        new transports.Http({
            host: 'logging.example.com', // Remote logging server URL
            path: \`/api/log?name=debug.log&group=mywebsite.com\`, // API endpoint for logging
        })
    ]
})`}
		</Code>

		<H level={2}>Step 3: Logging Messages</H>
		<p>
			Now that our logger is configured, we can use it to log messages. Below is an example of
			logging an informational message with additional metadata:
		</p>

		<Code>{`logger.info('Application started successfully', { environment: 'production' })`}</Code>

		<H level={2}>Step 4: Verifying Log Transmission</H>
		<p>
			After executing the above logging statement, your logs should appear on the remote server at
			logging.example.com.
		</p>
	</div>
</div>
