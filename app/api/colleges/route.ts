import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const minFees = searchParams.get('minFees') ? parseInt(searchParams.get('minFees')!) : undefined;
    const maxFees = searchParams.get('maxFees') ? parseInt(searchParams.get('maxFees')!) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (minFees !== undefined || maxFees !== undefined) {
      where.fees = {};
      if (minFees !== undefined) where.fees.gte = minFees;
      if (maxFees !== undefined) where.fees.lte = maxFees;
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
      prisma.college.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
