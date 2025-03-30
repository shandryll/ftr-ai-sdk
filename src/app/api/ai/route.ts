import { NextRequest, NextResponse } from "next/server";
import { generateObject } from 'ai'
import { openrouter } from "@/ai/open-router";
import { z } from 'zod'

export async function GET(request: NextRequest) {
    const result = await generateObject({
        model: openrouter.chat('openai/gpt-4o-2024-11-20'),
        schema: z.object({
            pt: z.string().describe('Tradução para português'),
            es: z.string().describe('Tradução para espanhol'),
            fr: z.string().describe('Tradução para francês'),
        }),
        prompt: 'Traduza "Hello World" para diferentes idiomas',
        system: 'Você é uma AI especializada em tradução, sempre retorne da maneira mais sucinta possível'
    })

    return NextResponse.json({ message: result.object })
}