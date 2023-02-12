import type { FastifyReply, FastifyRequest } from 'fastify'
import argon2 from 'argon2'
import { database } from '../mockdb'

export type SignInRequest = FastifyRequest<{
	Body: {
		email: string
		password: string
	}
}>

export type RegisterRequest = FastifyRequest<{
	Body: {
		email: string
		name: string
		password: string
	}
}>

export type ProfileRequest = FastifyRequest<{
	Params: {
		id: string
	}
}>

export type ImageRequest = FastifyRequest<{
	Body: {
		id: string
	}
}>

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
	return 'this is working'
}

export const getPing = async (request: FastifyRequest, reply: FastifyReply) => {
	return 'pong\n'
}

export const postSignIn = async (
	request: SignInRequest,
	reply: FastifyReply
) => {
	const hash =
		'$argon2id$v=19$m=65536,t=3,p=4$YNZ18XTXk4lUcFZaJ7HFvA$k0uB52MG7Lc/GmjH4gtgBUDhE8vsOriH8FlDY5EJ40Q'
	argon2.verify(hash, request.body?.password).then(match => {
		if (match) {
			console.log('match')
		} else {
			console.log('no match')
		}
	})

	if (
		request.body?.email === database.users[0].email &&
		request.body?.password === database.users[0].password
	) {
		return database.users[0]
	} else {
		reply.status(401)
		return 'Unauthorized'
	}
}

export const postRegister = async (
	request: RegisterRequest,
	reply: FastifyReply
) => {
	let hashedPassword = ''

	const { email, name, password } = request.body

	hashedPassword = await argon2.hash(password)
	console.log('hash: ', hashedPassword)

	const lastId = database.users[database.users.length - 1].id

	database.users.push({
		id: lastId + 1,
		name,
		email,
		password: hashedPassword,
		entries: 0,
		joined: new Date(),
	})
	return database.users[database.users.length - 1]
}

export const getUsers = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	return database.users
}

export const getProfileById = async (
	request: ProfileRequest,
	reply: FastifyReply
) => {
	const { id } = request.params
	const foundUser = database.users.find(user => user.id === Number(id))

	if (!foundUser) {
		// reply.status(404)
		// return 'not found'

		throw { statusCode: 404, message: 'not found' }
	}

	return foundUser
}

export const putImage = async (request: ImageRequest, reply: FastifyReply) => {
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
}
