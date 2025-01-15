// src/services/user.service.ts
import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../errors/BadRequestError';

const prisma = new PrismaClient();

/**
 * Create a user and assign categories
 * If a category code doesn't exist, create a new category.
 * Otherwise, link the existing category.
 */
export const createUser = async (email: string, categoryCodes: number[]) => {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new BadRequestError(`User with email '${email}' already exists.`);
    }

    // Prepare categories - either create or connect
    const categoryLinks = await Promise.all(
        categoryCodes.map(async (code) => {
            let category = await prisma.category.findUnique({
                where: { code },
            });
            if (!category) {
                category = await prisma.category.create({
                    data: { code },
                });
            }
            return { id: category.id };
        })
    );

    // Create user with connected categories
    const newUser = await prisma.user.create({
        data: {
            email,
            categories: {
                connect: categoryLinks,
            },
        },
        select: {
            id: true,
            email: true,
            categories: {
                select: {
                    code: true,
                },
            },
        },
    });

    return {
        id: newUser.id,
        email: newUser.email,
        categories: newUser.categories.map((cat) => cat.code),
    };
};

export const getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            email: true,
            categories: {
                select: {
                    code: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error(`User with id '${userId}' not found.`);
    }

    return {
        email: user.email,
        categories: user.categories.map((cat) => cat.code),
    };
};

