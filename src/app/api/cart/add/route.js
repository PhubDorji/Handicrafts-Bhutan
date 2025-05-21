import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, name, price } = body;

    // TEMP: Hardcoded userId (in real app, use auth)
    const userId = 1;

    if (!productId || !price) {
      return Response.json({ success: false, message: 'Missing productId or price' }, { status: 400 });
    }

    // Check if the product already exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    });

    let cartItem;

    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: { increment: 1 },
        },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          productName: name,
          price,
          quantity: 1,
        },
      });
    }

    return Response.json({ success: true, cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // TEMP: Hardcoded userId (in real app, use auth)
    const userId = 1;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
    });

    return Response.json({ success: true, cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
