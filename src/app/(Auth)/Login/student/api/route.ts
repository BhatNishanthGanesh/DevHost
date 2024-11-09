import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, password, page } = await req.json();

  // Ensure all required fields are provided
  if (!name || !password || !page) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Sending the login request to your backendhttps://alumni-connect-backend-iydi.onrender.com
    const response = await fetch(`/login/${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    console.log(data)
    

    // If the login fails (e.g., invalid credentials)
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Login failed' }, { status: 401 });
    }

    // Return a success message for a successful login
    return NextResponse.json({ message: 'Login successful', userId: data.userId,token: data.token });

  } catch (error: unknown) {
    // Handle unexpected errors
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    // For non-Error cases, return a generic error message
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
