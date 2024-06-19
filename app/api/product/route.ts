import { getAllProducts } from '@/lib/actions/productAction';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit')
            ? parseInt(searchParams.get('limit') as string)
            : undefined;
        const products = await getAllProducts(limit);

        if (products) {
            return new NextResponse(JSON.stringify(products), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all products' }),
            { status: 500 }
        );
    }
};
