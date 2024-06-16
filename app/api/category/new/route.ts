import { addCategory } from '@/lib/actions/categoryAction';
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
        const category = await addCategory(data);

        if (category) {
            return new NextResponse(
                JSON.stringify({ message: 'Add Category Success' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to add category' }),
            { status: 500 }
        );
    }
};
