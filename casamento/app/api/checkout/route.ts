import { NextRequest, NextResponse } from 'next/server';

interface CartItem {
  id: number;
  nome: string;
  quantidade: number;
  valor: string;
}

interface CheckoutRequest {
  items: CartItem[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    // Validar items
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio' },
        { status: 400 }
      );
    }

    // Montar payload para InfinitePay
    const items = body.items.map((item) => ({
      quantity: item.quantidade,
      price: Math.round(Number(item.valor) * 100), // Converter para centavos
      description: item.nome,
    }));

    const payload = {
      handle: 'antonio-aldisio',
      items,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pagamento-concluido?status=success`,
    };

    console.log('[Checkout] Enviando para InfinitePay:', payload);

    // Fazer POST para API InfinitePay
    const response = await fetch(
      'https://api.infinitepay.io/invoices/public/checkout/links',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[Checkout] Erro da API:', response.status, errorData);
      return NextResponse.json(
        { error: 'Erro ao processar pagamento' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[Checkout] Resposta da API:', data);

    // Extrair URL de checkout
    const checkoutUrl = data.data?.url || data.url;
    if (!checkoutUrl) {
      console.error('[Checkout] URL não encontrada na resposta:', data);
      return NextResponse.json(
        { error: 'URL de checkout não encontrada' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: checkoutUrl,
    });
  } catch (error) {
    console.error('[Checkout] Erro:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao processar checkout',
      },
      { status: 500 }
    );
  }
}
