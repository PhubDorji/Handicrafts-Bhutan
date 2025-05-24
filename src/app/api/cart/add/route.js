import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, name, price, image } = body;

    // You should get the authenticated user's ID from the session
    // For now, we'll use a hardcoded ObjectId for testing
    const userId = new ObjectId("65f1a9e3b4d4c3a9c8f3b2a1"); // Replace with actual user ID

    if (!productId || !price) {
      return Response.json({ 
        success: false, 
        message: 'Missing productId or price' 
      }, { status: 400 });
    }

    // Convert productId to ObjectId
    const productObjectId = new ObjectId(productId);

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: userId.toString(), // Prisma will handle the conversion
        productId: productObjectId.toString(),
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
      // Fetch product details to ensure they exist
      const product = await prisma.product.findUnique({
        where: { id: productObjectId.toString() },
      });

      if (!product) {
        return Response.json({ 
          success: false, 
          message: 'Product not found' 
        }, { status: 404 });
      }

      cartItem = await prisma.cartItem.create({
        data: {
          userId: userId.toString(),
          productId: productObjectId.toString(),
          productName: name || product.name,
          productImage: image || product.images[0],
          price: parseFloat(price) || product.price,
          quantity: 1,
        },
      });
    }

    return Response.json({ success: true, cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return Response.json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Again, use the actual authenticated user's ID
    const userId = new ObjectId("65f1a9e3b4d4c3a9c8f3b2a1"); // Replace with actual user ID

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: userId.toString() },
      include: {
        product: {
          select: {
            name: true,
            images: true,
            price: true
          }
        }
      },
    });

    return Response.json({ success: true, cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return Response.json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}