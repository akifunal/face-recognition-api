import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get('/', async (req, res) => {
		return 'this is working'
	})

	fastify.get('/ping', async (req, res) => {
		return 'pong\n'
	})

	fastify.post('/signin', (req, res) => {
		res.send('success/fail')
	})

	fastify.post('/register', (req, res) => {
		res.send('user')
	})

	fastify.get('/profile/:userId', (req, res) => {
		res.send(req.params)
	})

	fastify.put('/image', (req, res) => {
		res.send('user')
	})
}

export default routes

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
