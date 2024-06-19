import { deleteCoupon } from '@/lib/actions/couponAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const deletedCoupon = await deleteCoupon(Number(params.id));

        if (deletedCoupon) {
            return new NextResponse(
                JSON.stringify({ message: 'Delete Success Coupon' }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to delete ID coupon: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};
