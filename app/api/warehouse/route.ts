import { getAllWarehouse } from '@/lib/actions/warehouseAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const warehouses = await getAllWarehouse();

        if (warehouses) {
            return new NextResponse(JSON.stringify(warehouses), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all warehouses' }),
            { status: 500 }
        );
    }
};
