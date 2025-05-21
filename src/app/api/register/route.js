// src/app/api/register/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Parse JSON body
    const body = await request.json();
    const { username, email, password, userType } = body;

    // Basic validation (you can enhance this)
    if (!username || !email || !password || !userType) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Optional: Check if user already exists by email or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // TODO: Hash password before saving! (Use bcrypt or similar)
    // For demo, saving plain password (NOT RECOMMENDED)
    
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,  // Hash this in production!
        userType,
      },
    });

    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in /api/register:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
