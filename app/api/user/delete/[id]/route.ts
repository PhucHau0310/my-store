import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: params.id,
            },
            include: {
                orders: true,
            },
        });

        if (deletedUser) {
            return new NextResponse(
                JSON.stringify({ message: 'Deleted user' }),
                { status: 200 }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to delete user' }),
            { status: 500 }
        );
    }
};
