import prisma from '../prisma';
import { PaymentMethod } from '@prisma/client';

interface Product {
    id: number;
    name: String;
    picture: string;
    version: string;
    description: string;
    price: number;
    quantity: number;
    published: boolean;
    categoryId: number;
    quantityBuy: number;
}

export const getAllOrders = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: true,
                user: true,
                payment: true,
            },
        });

        return orders;
    } catch (error) {
        console.log(error);
        return error;
    }
};

function parsePaymentMethod(paymentMethodString: string): PaymentMethod {
    const paymentMethod = Object.values(PaymentMethod).find(
        (value) => value === paymentMethodString
    );

    if (!paymentMethod) {
        throw new Error(`Invalid payment method: ${paymentMethodString}`);
    }

    return paymentMethod;
}

export const createOrders = async (
    carts: Product[],
    userIdd: string,
    shippingAddress: string,
    paymentMethod: string
) => {
    try {
        const stock = await prisma.$transaction(async (prisma) => {
            for (const item of carts) {
                const stock = await prisma.stock.findFirst({
                    where: {
                        productId: item.id,
                    },
                });

                if (!stock || stock.quantity < item.quantityBuy) {
                    throw new Error(
                        `Insufficient stock for product ${item.id} in warehouse`
                    );
                }
            }

            const newOrder = await prisma.order.create({
                data: {
                    userId: userIdd,
                    totalAmount: carts.reduce(
                        (total, item) => total + item.quantityBuy * item.price,
                        0
                    ),
                    shippingAddress,
                    status: 'PENDING',
                    orderItems: {
                        create: carts.map((item) => ({
                            productId: item.id,
                            quantity: item.quantityBuy,
                            price: item.price,
                        })),
                    },
                },
            });

            const payment = await prisma.payment.create({
                data: {
                    orderId: newOrder.id,
                    amount: newOrder.totalAmount,
                    paymentMethod: parsePaymentMethod(paymentMethod),
                    status: 'PENDING',
                },
            });

            for (const item of carts) {
                await prisma.stock.updateMany({
                    where: {
                        productId: item.id,
                    },
                    data: {
                        quantity: {
                            decrement: item.quantityBuy,
                        },
                    },
                });
            }

            return newOrder;
        });

        return stock;
    } catch (error) {
        console.log(error);
    }
};
