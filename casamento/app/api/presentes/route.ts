import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(12, Math.max(1, parseInt(searchParams.get('limit') || '12')));
    const search = searchParams.get('search')?.trim() || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    // Construir o filtro
    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { descricao: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice) {
      where.valor = { ...where.valor, gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      where.valor = { ...where.valor, lte: parseFloat(maxPrice) };
    }

    const skip = (page - 1) * limit;

    // Buscar presentes e total
    const [presentes, total] = await Promise.all([
      prisma.sku.findMany({
        where,
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
      }),
      prisma.sku.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: presentes,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar presentes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar presentes' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, descricao, valor, link_da_imagem } = body ?? {};

    const trimmedNome = String(nome ?? '').trim();
    const trimmedDescricao = String(descricao ?? '').trim();
    const valorNumber = Number(valor);
    const trimmedLink = String(link_da_imagem ?? '').trim();

    if (!trimmedNome || !trimmedDescricao || !valor || !trimmedLink) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, descricao, valor, link_da_imagem' },
        { status: 400 }
      );
    }

    if (trimmedNome.length < 2) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (valorNumber <= 0) {
      return NextResponse.json(
        { error: 'Valor deve ser maior que zero' },
        { status: 400 }
      );
    }

    const sku = await prisma.sku.create({
      data: {
        nome: trimmedNome,
        descricao: trimmedDescricao,
        valor: valorNumber,
        link_da_imagem: trimmedLink,
      },
    });

    return NextResponse.json(sku, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar presente:', error);
    return NextResponse.json(
      { error: 'Erro ao criar presente' },
      { status: 500 }
    );
  }
}
