import { NextResponse } from 'next/server';

export async function GET() {
  const models = [
    {
      id: 'llama-4-scout-17b-16e-instruct',
      name: 'Llama 4 Scout 17B',
      description: 'Latest reasoning model with enhanced capabilities',
      speed: '1200 tokens/sec',
    },
    {
      id: 'llama-3.3-70b',
      name: 'Llama 3.3 70B',
      description: 'Most powerful model for complex tasks',
      speed: '450 tokens/sec',
    },
    {
      id: 'llama3.1-8b',
      name: 'Llama 3.1 8B',
      description: 'Fast and efficient for everyday tasks',
      speed: '1800 tokens/sec',
    },
  ];

  return NextResponse.json({
    models,
    total: models.length,
    timestamp: new Date().toISOString(),
  });
}
