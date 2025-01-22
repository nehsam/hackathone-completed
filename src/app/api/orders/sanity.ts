import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: "15hm7ok6",
  dataset: "production",
  apiVersion: '2023-01-01',
  token: "skyEDFMwmS8Y9laviQSbbXOzFxEe1MNwZvgnWURpuUWm5qnn7lmRSltk7tgcClGe4N0m7i8kGAllFLhMg8Ww1A27O49uWYW7EdWLy8Jabhy6Eesk9hGMgvijMDnbsYCIdXajOsrSmxg42pUIXv8YOwkVetGVFv7KqChA4QwWXRCZuV3uaZJr",
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerAddress } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !customerAddress) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Create order document
    const orderData = {
      _type: 'order',
      customerName,
      customerEmail,
      customerAddress,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };

    // Save to Sanity
    const result = await sanityClient.create(orderData);

    return NextResponse.json({
      message: 'Order created successfully',
      sanityOrderId: result._id,
      orderDetails: {
        orderId: result._id,
        status: 'pending'
      }
    });

  } catch (error: unknown) {
    console.error('Order processing error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to process order' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
