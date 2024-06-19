import {
    deleteProductById,
    getProductById,
    updateProductById,
} from '@/lib/actions/productAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const foundProduct = await getProductById(Number(params.id));

        if (foundProduct) {
            return new NextResponse(JSON.stringify(foundProduct), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get ID product: ${params.id} `,
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

        const deletedProduct = await deleteProductById(Number(params.id));

        if (deletedProduct) {
            return new NextResponse(
                JSON.stringify({ message: 'Delete Success Product' }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to delete ID Product: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};

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
        const updatedProduct = await updateProductById(dataUpdate);

        if (updatedProduct) {
            return new NextResponse(
                JSON.stringify({
                    message: `Update Success ID Product ${params.id}`,
                }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to update ID product: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};
