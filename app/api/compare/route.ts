import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.getAll('ids');

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { error: 'No college IDs provided' },
        { status: 400 }
      );
    }

    if (ids.length > 3) {
      return NextResponse.json(
        { error: 'Can compare at most 3 colleges' },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        courses: true,
      },
    });

    if (colleges.length === 0) {
      return NextResponse.json(
        { error: 'No colleges found' },
        { status: 404 }
      );
    }

    return NextResponse.json(colleges);
  } catch (error) {
    console.error('Error comparing colleges:', error);
    return NextResponse.json(
      { error: 'Failed to compare colleges' },
      { status: 500 }
    );
  }
}
