import { createStock } from '@/lib/actions/stockAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        // const { userId } = getAuth(req);

        // if (!userId) {
        //     return new NextResponse(
        //         JSON.stringify({ message: 'Unauthorized' }),
        //         { status: 401, headers: { 'Content-Type': 'application/json' } }
        //     );
        // }

        const data = await req.json();
        const stock = await createStock(data);

        if (stock) {
            return new NextResponse(
                JSON.stringify({ message: 'Add Stock Success' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get stock' }),
            { status: 500 }
        );
    }
};
