import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Missing username or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // NOTE: In production, password must be hashed and compared securely!
    if (user.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If login success - send user data or token (token logic not included here)
    return new Response(JSON.stringify({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, userType: user.userType } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in /api/login:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
