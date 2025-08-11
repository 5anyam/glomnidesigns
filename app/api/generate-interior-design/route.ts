import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { image, style, roomType, prompt } = await req.json();

    // Validate required fields
    if (!image || !style || !roomType) {
      return NextResponse.json(
        { error: 'Missing required fields: image, style, and roomType' },
        { status: 400 }
      );
    }

    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('🔑 Using API key:', process.env.OPENAI_API_KEY.substring(0, 10) + '...');

    // Step 1: Analyze the uploaded image with GPT-4 Vision
    const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // Using more stable model for test
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this ${roomType} image and create a detailed, professional interior design prompt for image generation. The design should be in ${style} style. Include specific details about furniture placement, color schemes, lighting, materials, and decor elements. Additional requirements: ${prompt || 'Create a modern, elegant, and functional space.'}`
              },
              {
                type: "image_url",
                image_url: { 
                  url: image,
                  detail: "high"
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!analysisResponse.ok) {
      const errorData = await analysisResponse.json();
      console.error('❌ Vision API Error:', errorData);
      return NextResponse.json(
        { 
          error: 'Failed to analyze image', 
          details: errorData.error?.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

    const analysisResult = await analysisResponse.json();
    const designPrompt = analysisResult.choices?.[0]?.message?.content;

    if (!designPrompt) {
      return NextResponse.json(
        { error: 'Failed to generate design analysis' },
        { status: 500 }
      );
    }

    console.log('✅ Generated design prompt:', designPrompt.substring(0, 100) + '...');

    // Step 2: Generate new image with DALL-E 3
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Professional interior design rendering: ${designPrompt}. High-quality, photorealistic, architectural photography style, well-lit, professional interior design magazine quality.`,
        n: 1,
        size: "1024x1024",
        quality: "standard", // Using standard for test key to save costs
        style: "natural"
      }),
    });

    if (!imageResponse.ok) {
      const errorData = await imageResponse.json();
      console.error('❌ DALL-E Error:', errorData);
      return NextResponse.json(
        { 
          error: 'Failed to generate design image', 
          details: errorData.error?.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

    const imageResult = await imageResponse.json();
    
    if (!imageResult.data?.[0]?.url) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      );
    }

    console.log('✅ Successfully generated image!');
    
    return NextResponse.json({
      success: true,
      generatedImage: imageResult.data[0].url,
      analysisPrompt: designPrompt,
      style: style,
      roomType: roomType,
      timestamp: new Date().toISOString(),
      apiUsage: {
        visionTokens: analysisResult.usage?.total_tokens || 0,
        imageGeneration: 1
      }
    });

  } catch (error) {
    console.error('🔥 API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
