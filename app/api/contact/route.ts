import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required transmission Intel.' },
        { status: 400 }
      );
    }

    const newMessage = await Contact.create({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return NextResponse.json(
      { message: 'Transmission received by Mission Control.', id: newMessage._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Transmission Error:', error);
    return NextResponse.json(
      { error: 'Handshake failed. Encryption protocols compromised.' },
      { status: 500 }
    );
  }
}
