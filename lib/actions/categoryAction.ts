import prisma from '../prisma';

interface CategoryType {
    id?: number;
    name: string;
    description: string;
    image: string;
}

export const addCategory = async (dataCate: CategoryType) => {
    try {
        const category = await prisma.category.create({
            data: dataCate,
        });

        return category;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true,
                promotions: true,
            },
        });

        return categories;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteCategoryById = async (cateId: number) => {
    try {
        const deletedCategory = await prisma.category.delete({
            where: {
                id: cateId,
            },
        });

        return deletedCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateCategoryById = async (dataUpdate: CategoryType) => {
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: dataUpdate.id,
            },
            data: dataUpdate,
        });

        return updatedCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getCategoryById = async (cateId: number | undefined) => {
    try {
        const foundCategory = await prisma.category.findFirst({
            where: {
                id: cateId,
            },
        });

        return foundCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
};
