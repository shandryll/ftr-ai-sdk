import { NextRequest } from "next/server";
import { streamText } from 'ai'
import { openrouter } from "@/ai/open-router";
import { tools } from "@/ai/tools"

export async function POST(request: NextRequest) {
    const { messages } = await request.json()

    const result = streamText({
        model: openrouter.chat('openai/gpt-4o-2024-11-20'),
        tools,
        messages,
        maxSteps: 5,
        toolChoice: 'required',
        system: `
            Sempre responsa em markdown sem aspas no início e no fim.
            Sempre que o usuário pedir para acessar uma URL ou buscar informações de um usuário do GitHub, use a ferramenta profileAndUrls.
        `
    })

    return result.toDataStreamResponse()
}