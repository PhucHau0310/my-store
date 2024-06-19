import prisma from '../prisma';
import dayjs from 'dayjs';
interface Coupon {
    id?: number;
    code: string;
    description?: string;
    discount: number;
    startDate: string;
    endDate: string;
    categoryId: number;
}

export const getAllCoupon = async () => {
    try {
        const coupons = await prisma.promotion.findMany({
            include: {
                category: true,
            },
        });

        return coupons;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const addCoupon = async (data: Coupon) => {
    try {
        const formattedStartDate = dayjs(data.startDate).toISOString();
        const formattedEndDate = dayjs(data.endDate).toISOString();

        const coupon = await prisma.promotion.create({
            data: {
                ...data,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            },
        });

        return coupon;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteCoupon = async (id: number) => {
    try {
        const coupon = await prisma.promotion.delete({
            where: {
                id: id,
            },
        });

        return coupon;
    } catch (error) {
        console.log(error);
        return error;
    }
};
