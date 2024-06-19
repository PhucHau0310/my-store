import { addProduct } from '@/lib/actions/productAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const data = await req.json();
        const product = await addProduct(data);

        if (product) {
            return new NextResponse(
                JSON.stringify({ message: 'Add Product Success' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to add product' }),
            { status: 500 }
        );
    }
};
