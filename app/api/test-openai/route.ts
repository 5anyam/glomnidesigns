import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        success: false,
        error: 'OpenAI API key not found in environment variables' 
      }, { status: 500 });
    }

    // Test API key with a simple models request
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ 
        success: false,
        error: 'API key validation failed', 
        details: error 
      }, { status: 401 });
    }

    const data = await response.json();
    
    // Check if DALL-E and GPT-4 models are available
    const availableModels = data.data?.map((m: any) => m.id) || [];
    const hasGPT4 = availableModels.some((model: string) => model.includes('gpt-4'));
    const hasDallE = availableModels.some((model: string) => model.includes('dall-e'));

    return NextResponse.json({ 
      success: true, 
      message: 'OpenAI API key is working perfectly!',
      capabilities: {
        gpt4Available: hasGPT4,
        dalleAvailable: hasDallE,
        totalModels: availableModels.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI test error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
