import { getAllReviews } from '@/lib/actions/reviewAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const reviews = await getAllReviews();

        if (reviews) {
            return new NextResponse(JSON.stringify(reviews), { status: 200 });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all reviews' }),
            { status: 500 }
        );
    }
};
