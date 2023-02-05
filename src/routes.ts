import type {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyRequest,
} from 'fastify'
import { database } from './mockdb'
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

type SignInRequest = FastifyRequest<{
	Body: {
		email: string
		password: string
	}
}>

type RegisterRequest = FastifyRequest<{
	Body: {
		email: string
		name: string
		password: string
	}
}>

type ProfileRequest = FastifyRequest<{
	Params: {
		id: string
	}
}>

type ImageRequest = FastifyRequest<{
	Body: {
		id: string
	}
}>

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get('/', async (request, reply) => {
		return 'this is working'
	})

	fastify.get('/ping', async (request, reply) => {
		return 'pong\n'
	})

	fastify.post('/signin', async (request: SignInRequest, reply) => {
		if (
			request.body?.email === database.users[0].email &&
			request.body?.password === database.users[0].password
		) {
			return database.users[0]
		} else {
			reply.status(400)
			return 'error logging in'
		}
	})

	fastify.post('/register', async (request: RegisterRequest, reply) => {
		const { email, name, password } = request.body

		const lastId = database.users[database.users.length - 1].id

		database.users.push({
			id: lastId + 1,
			name,
			email,
			password,
			entries: 0,
			joined: new Date(),
		})
		return database.users[database.users.length - 1]
	})

	fastify.get('/users', async (request, reply) => {
		return database.users
	})

	fastify.get('/profile/:id', async (request: ProfileRequest, reply) => {
		const { id } = request.params
		const foundUser = database.users.find(user => user.id === Number(id))

		if (!foundUser) {
			// reply.status(404)
			// return 'not found'

			throw { statusCode: 404, message: 'not found' }
		}

		return foundUser
	})

	fastify.put('/image', async (request: ImageRequest, reply) => {
		const { id } = request.body
		const { users } = database
		let isFound = false

		for (const user of users) {
			if (user.id === Number(id)) {
				isFound = true
				user.entries++
				return user.entries
			}
		}

		if (!isFound) {
			throw { statusCode: 404, message: 'not found' }
		}
	})
}

export default routes
