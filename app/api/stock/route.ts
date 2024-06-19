import { getAllStock } from '@/lib/actions/stockAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const stocks = await getAllStock();

        if (stocks) {
            return new NextResponse(JSON.stringify(stocks), { status: 200 });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all stocks' }),
            { status: 500 }
        );
    }
};
