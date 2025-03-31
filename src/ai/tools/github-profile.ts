import { github } from "@/lib/octokit"
import { tool } from "ai"
import { setTimeout } from "node:timers/promises"
import { z } from "zod"

export const githubProfile = tool({
    description: "Essa ferramenta serve para buscar dados de um usuário no GitHub ou acessar URLs da API para orutras informações de um usuário,\
                    como repositórios, seguidores e organizações.",
    parameters: z.object({
        username: z.string().describe("O nome de usuário do GitHub"),
    }),
    execute: async ({ username }) => {
        await setTimeout(2000)

        const response = await github.users.getByUsername({ username })

        return response.data
    }
})