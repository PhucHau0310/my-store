import prisma from '../prisma';

interface Warehouse {
    id?: number;
    name: string;
    location: string;
}

export const getAllWarehouse = async () => {
    try {
        const warehouses = await prisma.warehouse.findMany({
            include: {
                stocks: true,
            },
        });

        return warehouses;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createWarehouse = async (dataWarehouse: Warehouse) => {
    try {
        const warehouse = await prisma.warehouse.create({
            data: dataWarehouse,
        });

        return warehouse;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateWarehouse = async (dataUpdate: Warehouse) => {
    try {
        const warehouse = await prisma.warehouse.update({
            where: {
                id: dataUpdate.id,
            },
            data: dataUpdate,
        });

        return warehouse;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteWarehouse = async (id: number) => {
    try {
        const warehouse = await prisma.warehouse.delete({
            where: {
                id: id,
            },
        });

        return warehouse;
    } catch (error) {
        console.log(error);
        return error;
    }
};
