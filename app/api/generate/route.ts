import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';

export async function POST(req: NextRequest) {
  try {
    console.log('API route called');
    const { messages, model = 'llama3.1-8b', apiKey } = await req.json();
    console.log('Request data:', { messages, model, hasApiKey: !!apiKey });

    // Use API key from request body or environment
    const cerebrasApiKey = apiKey || process.env.CEREBRAS_API_KEY;

    if (!cerebrasApiKey) {
      console.log('No API key provided');
      return NextResponse.json(
        { error: 'Cerebras API key not configured. Please add your API key in settings.' },
        { status: 401 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Make direct API call to Cerebras (non-streaming for simplicity)
    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cerebrasApiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        stream: false, // Non-streaming for easier handling
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return NextResponse.json(
        { error: errorData.error || `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the content from the response
    return NextResponse.json({
      content: data.choices?.[0]?.message?.content || 'No content generated',
      usage: data.usage,
      model: data.model
    });

  } catch (error) {
    console.error('Cerebras API error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while generating content. Please try again.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
