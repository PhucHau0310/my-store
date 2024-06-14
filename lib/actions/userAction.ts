import prisma from '../prisma';

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    shippingAddress?: string;
    mobile?: string;
    passwordHash?: string;
}

export const addOrUpdateUser = async (infoUser: User) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: infoUser.id,
            },
        });

        if (user) {
            return;
        } else {
            const newUser = await prisma.user.create({
                data: infoUser,
            });

            return newUser;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteUser = async (idUser: string) => {
    try {
        const userDeleted = await prisma.user.delete({
            where: {
                id: idUser,
            },
        });

        return userDeleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};
