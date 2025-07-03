import { NextRequest, NextResponse } from 'next/server';
import { createCerebras } from '@ai-sdk/cerebras';
import { streamText, convertToCoreMessages } from 'ai';

const cerebras = createCerebras({
  apiKey: process.env.CEREBRAS_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'llama-4-scout-17b-16e-instruct' } = await req.json();

    if (!process.env.CEREBRAS_API_KEY) {
      return NextResponse.json(
        { error: 'Cerebras API key not configured' },
        { status: 500 }
      );
    }

    const coreMessages = convertToCoreMessages(messages);

    const result = await streamText({
      model: cerebras(model),
      messages: coreMessages,
      temperature: 0.7,
      maxTokens: 2048,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Cerebras API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating content' },
      { status: 500 }
    );
  }
}
