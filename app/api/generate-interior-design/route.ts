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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // ✅ Enhanced Step 1: Detailed room analysis
    const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are a professional interior designer. Analyze this ${roomType} image in detail and provide:

1. **Room Layout Description**: Describe the exact layout, room dimensions, window placements, door positions, and architectural features you see.

2. **Existing Elements**: List current furniture, fixtures, flooring, walls, ceiling details.

3. **Design Transformation Plan**: Create a detailed plan to transform this space into ${style} style while maintaining the EXACT same room layout and architectural structure.

4. **DALL-E Prompt**: Generate a detailed DALL-E prompt that includes:
   - Exact room dimensions and layout from the original image
   - Window and door positions
   - Architectural features to maintain
   - ${style} style furniture and decor to add
   - Professional lighting and photography style

Additional requirements: ${prompt || 'Create a cohesive, elegant design'}

Format your response as JSON with keys: "roomAnalysis", "existingElements", "designPlan", "dallePrompt"`
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
        max_tokens: 1000,
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
    let designAnalysis;

    try {
      // ✅ Parse the structured response
      const analysisContent = analysisResult.choices?.[0]?.message?.content;
      designAnalysis = JSON.parse(analysisContent);
    } catch (e) {
      // Fallback if JSON parsing fails
      const analysisContent = analysisResult.choices?.[0]?.message?.content;
      designAnalysis = {
        dallePrompt: analysisContent
      };
    }

    // ✅ Enhanced Step 2: Generate image with detailed layout preservation
    const enhancedPrompt = `
Professional interior design photograph: ${designAnalysis.dallePrompt || designAnalysis}

IMPORTANT SPECIFICATIONS:
- Maintain EXACT room proportions and layout
- Keep all architectural elements (windows, doors, walls, ceiling) in their original positions
- Apply ${style} interior design style thoughtfully
- Use professional architectural photography lighting
- High-resolution, magazine-quality interior design photo
- Realistic textures and materials
- Proper scale and proportions
- Natural lighting that complements the space

Style: ${style} | Room: ${roomType}
    `.trim();

    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "hd", // ✅ Use HD for better results
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

    console.log('✅ Successfully generated contextual design!');
    
    return NextResponse.json({
      success: true,
      generatedImage: imageResult.data[0].url,
      analysisPrompt: designAnalysis.roomAnalysis || 'Room analyzed successfully',
      designPlan: designAnalysis.designPlan || 'Design plan created',
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
