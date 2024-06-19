import { addReview } from '@/lib/actions/reviewAction';
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
        const review = await addReview(data);

        if (review) {
            return new NextResponse(
                JSON.stringify({ message: 'Add Review Success' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all reviews' }),
            { status: 500 }
        );
    }
};
