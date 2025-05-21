import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.formData();
    
    // Extract form fields
    const name = data.get('name');
    const description = data.get('description');
    const category = data.get('category');
    const price = data.get('price');
    const offerPrice = data.get('offerPrice');
    const image = data.get('image');

    if (!name || !category || !price || !image) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle file upload
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const fileName = `${Date.now()}-${image.name}`;
    const uploadPath = path.join(process.cwd(), 'public', 'product', fileName);
    
    // Write file to public/product directory
    await writeFile(uploadPath, buffer);
    
    const imageUrl = `/product/${fileName}`;

    // Save product to database
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || '',
        category,
        price: parseFloat(price),
        offerPrice: offerPrice ? parseFloat(offerPrice) : null,
        images: [imageUrl],
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error' },
      { status: 500 }
    );
  }
}