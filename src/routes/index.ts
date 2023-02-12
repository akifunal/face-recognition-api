import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
	get,
	getPing,
	getProfileById,
	getUsers,
	postRegister,
	postSignIn,
	putImage,
} from '../controllers'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get('/', get)

	fastify.get('/ping', getPing)

	fastify.post('/signin', postSignIn)

	fastify.post('/register', postRegister)

	fastify.get('/users', getUsers)

	fastify.get('/profile/:id', getProfileById)

	fastify.put('/image', putImage)
}

export default routes
