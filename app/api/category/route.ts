import { addCategory, getAllCategories } from '@/lib/actions/categoryAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

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
            JSON.stringify({ message: 'Failed to add category' }),
            { status: 500 }
        );
    }
};
