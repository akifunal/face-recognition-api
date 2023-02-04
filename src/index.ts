import fastify from 'fastify'
import routes from './routes'

const server = fastify({ logger: true })

server.register(routes)

server.listen({ port: 8080 }, err => {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}
})
