import { getAllCategories } from '@/lib/actions/categoryAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const categories = await getAllCategories();

        if (categories) {
            return new NextResponse(JSON.stringify(categories), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all category' }),
            { status: 500 }
        );
    }
};
