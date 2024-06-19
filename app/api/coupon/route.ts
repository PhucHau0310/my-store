import { getAllCoupon } from '@/lib/actions/couponAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const coupons = await getAllCoupon();

        if (coupons) {
            return new NextResponse(JSON.stringify(coupons), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all coupons' }),
            { status: 500 }
        );
    }
};
