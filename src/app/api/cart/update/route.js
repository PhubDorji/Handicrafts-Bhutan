import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { itemId, quantity } = await request.json();

    if (!itemId || quantity < 1) {
      return Response.json({ success: false, message: 'Invalid itemId or quantity' }, { status: 400 });
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    // Return updated cart
    const userId = 1;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
    });

    return Response.json({ success: true, cartItems });
  } catch (error) {
    console.error('Error updating cart:', error);
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
