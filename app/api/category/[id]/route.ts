import {
    deleteCategoryById,
    getCategoryById,
    updateCategoryById,
} from '@/lib/actions/categoryAction';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const foundCategory = await getCategoryById(Number(params.id));

        if (foundCategory) {
            return new NextResponse(JSON.stringify(foundCategory), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get ID category: ${params.id} `,
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

        const deletedCategory = await deleteCategoryById(Number(params.id));

        if (deletedCategory) {
            return new NextResponse(
                JSON.stringify({ message: 'Delete Success Category' }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get ID category: ${params.id} `,
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
        const updatedCategory = await updateCategoryById(dataUpdate);

        if (updatedCategory) {
            return new NextResponse(
                JSON.stringify({
                    message: `Update Success ID Category ${params.id}`,
                }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get ID category: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};
