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

	// get all users
fastify.get('/', get)

	// ping
	fastify.get('/ping', getPing)

	// sign in
	fastify.post('/signin', postSignIn)

	// register
	fastify.post('/register', postRegister)

	// get all users
	fastify.get('/users', getUsers)

	// get profile by id
	fastify.get('/profile/:id', getProfileById)

	// update image
	fastify.put('/image', putImage)
}

export default routes
