import { NextResponse } from 'next/server';

// Lightweight health-check endpoint.
export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
