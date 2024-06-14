import { getAllUser } from '@/lib/actions/userAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const users = await getAllUser();

        if (users) {
            return new NextResponse(JSON.stringify(users), { status: 200 });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Error fetch all users' }),
            { status: 500 }
        );
    }
};
