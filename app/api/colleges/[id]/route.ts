import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
      },
    });

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json(
      { error: 'Failed to fetch college' },
      { status: 500 }
    );
  }
}
