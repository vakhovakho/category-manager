// src/tests/user.test.ts
import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User API Tests', () => {
    beforeAll(async () => {
        // Ensure a fresh database state
        await prisma.user.deleteMany({});
        await prisma.category.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should create a new user with categories', async () => {
        const response = await request(app)
            .post('/users/create')
            .send({ email: 'test@example.com', categories: [8, 63, 89] });

        expect(response.statusCode).toBe(201);
        expect(response.body.email).toBe('test@example.com');
        expect(response.body.categories).toEqual([8, 63, 89]);
    });

    it('should fail if user with same email already exists', async () => {
        const response = await request(app)
            .post('/users/create')
            .send({ email: 'test@example.com', categories: [8] });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('already exists');
    });

    it('should retrieve a user with their categories', async () => {
        // We know from the first test, 'test@example.com' user was created with an ID of 1
        // (since it's the first user in an autoincrement DB). But let's fetch it from the DB:
        const user = await prisma.user.findUnique({
            where: { email: 'test@example.com' },
        });

        const response = await request(app).get(`/users/${user?.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe('test@example.com');
        expect(response.body.categories).toEqual([8, 63, 89]);
    });
});

