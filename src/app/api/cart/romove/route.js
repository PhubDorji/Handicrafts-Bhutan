import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request) {
  try {
    const { itemId } = await request.json();

    if (!itemId) {
      return Response.json({ success: false, message: 'Missing itemId' }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    // Return updated cart
    const userId = 1;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
    });

    return Response.json({ success: true, cartItems });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
