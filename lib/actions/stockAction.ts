import prisma from '../prisma';

interface Stock {
    id?: number;
    productId: number;
    warehouseId: number;
    quantity: number;
}

export const getAllStock = async () => {
    try {
        const stock = await prisma.stock.findMany({
            include: {
                product: true,
                warehouse: true,
            },
        });

        return stock;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createStock = async (dataStock: Stock) => {
    try {
        const stock = await prisma.stock.create({
            data: dataStock,
        });

        return stock;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateStock = async (dataUpdate: Stock) => {
    try {
        const stock = await prisma.stock.update({
            where: {
                id: dataUpdate.id,
            },
            data: dataUpdate,
        });

        return stock;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteStock = async (idDelete: number) => {
    try {
        const stock = await prisma.stock.delete({
            where: {
                id: idDelete,
            },
        });

        return stock;
    } catch (error) {
        console.log(error);
        return error;
    }
};
