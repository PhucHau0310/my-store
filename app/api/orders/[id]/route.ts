import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { status, shippingAddress } = await req.json();
        const updatedOrder = await prisma.order.update({
            where: {
                id: Number(params.id),
            },
            data: {
                id: Number(params.id),
                status,
                shippingAddress,
            },
            include: {
                orderItems: true,
                payment: true,
            },
        });

        if (updatedOrder) {
            return new NextResponse(
                JSON.stringify({
                    message: `Update Success ID Order ${params.id}`,
                }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({
                message: `Failed to update ID category: ${params.id} `,
            }),
            { status: 500 }
        );
    }
};
