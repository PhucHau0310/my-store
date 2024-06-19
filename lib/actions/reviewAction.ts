import prisma from '../prisma';

interface ReviewType {
    productId: number;
    userId: string;
    rating: number;
    comment?: string;
}

export const getAllReviews = async () => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                product: true,
                user: true,
            },
        });
        if (reviews) {
            return reviews;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const addReview = async (dataReview: ReviewType) => {
    try {
        const reviews = await prisma.review.create({
            data: dataReview,
        });

        if (reviews) {
            return reviews;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
