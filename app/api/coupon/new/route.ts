import { addCoupon } from '@/lib/actions/couponAction';
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
        const coupon = await addCoupon(data);

        if (coupon) {
            return new NextResponse(
                JSON.stringify({ message: 'Add Coupon Success' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to add coupon' }),
            { status: 500 }
        );
    }
};
