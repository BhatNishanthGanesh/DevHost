import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { name, phone_number, password, company, stack, package: packageAmount, location, advice, comment, requirements, page } = await req.json();

    if (!name || !password || !page) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://alumni-connect-backend-iydi.onrender.com/create-profile/${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone_number, password, company, stack, package: packageAmount, location, advice, comment, requirements }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return NextResponse.json({ message: 'Registration successful!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}
