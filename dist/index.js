"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)({ logger: true });
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});
server.listen({ port: 8080 }, err => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});
