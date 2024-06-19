import { getAllOrders } from '@/lib/actions/orderAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const orders = await getAllOrders();

        return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all orders' }),
            { status: 500 }
        );
    }
};
