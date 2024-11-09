import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, password, page } = await req.json();

  if (!name || !password || !page) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const [response, response1] = await Promise.all([
      fetch(`https://alumni-connect-backend-iydi.onrender.com/create-profile/${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      }),
      fetch("https://chat-app-b39u.onrender.com/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, role: "Student" }),
      }),
    ]);

    // Parse JSON responses
    const data1 = await response.json();
    const data2 = await response1.json();

    if (!response.ok) {
      throw new Error(data1.message || 'Registration failed at profile creation');
    }

    if (!response1.ok) {
      throw new Error(data2.message || 'Registration failed at chat service');
    }

    return NextResponse.json({ message: 'Registration successful!' });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}