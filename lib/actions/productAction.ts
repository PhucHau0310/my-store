import prisma from '../prisma';

interface ProductType {
    id: number;
    name: string;
    picture: string;
    version?: string;
    description: string;
    price: number;
    quantity: number;
    published?: boolean;
    categoryId: number;
    stockQuantity?: number;
}

export const addProduct = async (dataProduct: ProductType) => {
    try {
        const product = await prisma.product.create({
            data: dataProduct,
        });

        return product;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllProducts = async (limit?: number) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                CartItem: true,
                category: true,
                OrderItem: true,
                Review: {
                    include: {
                        user: true,
                    },
                },
                Stock: true,
                SupportRequest: true,
                Warranty: true,
            },
            take: limit,
        });

        return products;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteProductById = async (productId: number) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: productId,
            },
        });

        return deletedProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateProductById = async (dataUpdate: ProductType) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: dataUpdate.id,
            },
            data: dataUpdate,
            include: {
                category: true,
            },
        });

        // if (dataUpdate.stockQuantity) {
        //     const stockRecord = await prisma.stock.findFirst({
        //         where: {
        //             productId: dataUpdate.id,
        //         },
        //     });

        //     if (stockRecord) {
        //         await prisma.stock.update({
        //             where: {
        //                 id: stockRecord.id,
        //             },
        //             data: {
        //                 quantity: dataUpdate.stockQuantity,
        //             },
        //         });
        //     }
        // }

        return updatedProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getProductById = async (productId: number | undefined) => {
    try {
        const foundProduct = await prisma.product.findFirst({
            where: {
                id: productId,
            },
            include: {
                Review: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return foundProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
};
