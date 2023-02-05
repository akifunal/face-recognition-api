import 'dotenv/config'

import fastify from 'fastify'
import routes from './routes'

const server = fastify({ logger: true })

server.register(routes)

server.listen({ port: Number(process.env.PORT) }, err => {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}
})
