import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, quantity } = body ?? {};

    const trimmedName = String(name ?? '').trim();
    const trimmedEmail = String(email ?? '').trim().toLowerCase();
    const quantityNumber = Number(quantity);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail || !quantity) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, email, quantity' },
        { status: 400 }
      );
    }

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantityNumber) || quantityNumber < 1 || quantityNumber > 20) {
      return NextResponse.json(
        { error: 'Quantidade de pessoas inválida' },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        quantity: quantityNumber,
      },
    });

    return NextResponse.json({ ok: true, id: rsvp.id });
  } catch {
    return NextResponse.json({ error: 'Erro ao salvar confirmação' }, { status: 500 });
  }
}