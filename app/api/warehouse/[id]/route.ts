import {
    deleteWarehouse,
    updateWarehouse,
} from '@/lib/actions/warehouseAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
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

        const dataUpdate = await req.json();
        const updatedWarehouse = await updateWarehouse(dataUpdate);

        if (updatedWarehouse) {
            return new NextResponse(
                JSON.stringify({
                    message: `Update Success ID Warehouse ${params.id}`,
                }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to update ID Warehouse: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};

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

        const deletedWarehouse = await deleteWarehouse(Number(params.id));

        if (deletedWarehouse) {
            return new NextResponse(
                JSON.stringify({
                    message: `Delete Success ID Warehouse ${params.id}`,
                }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to delete ID Warehouse: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};
