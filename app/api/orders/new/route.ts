import { createOrders } from '@/lib/actions/orderAction';
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

        const { carts, userIdd, shippingAddress, paymentMethod } =
            await req.json();

        const orders = await createOrders(
            carts,
            userIdd,
            shippingAddress,
            paymentMethod
        );

        if (orders) {
            return new NextResponse(
                JSON.stringify({ message: 'Add orders Success' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to add orders' }),
            { status: 500 }
        );
    }
};
