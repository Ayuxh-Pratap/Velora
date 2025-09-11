import { protectedProcedure, createTRPCRouter } from "../init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { aiManager } from "@/lib/ai/manager";
import { prepareVeloraPrompt } from "@/utils/velora-prompt-loader";

export const aiRouter = createTRPCRouter({
    generateResponse: protectedProcedure
        .input(z.object({
            messages: z.array(z.object({
                role: z.enum(['user', 'assistant']),
                content: z.string()
            })),
            config: z.object({
                provider: z.enum(['gemini', 'openai', 'claude']).optional(),
                model: z.string().optional(),
                temperature: z.number().min(0).max(2).optional(),
                maxTokens: z.number().positive().optional(),
                systemPrompt: z.string().optional(),
                useVeloraMode: z.boolean().optional()
            }).optional()
        }))
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx;
            const { messages, config } = input;

            try {
                // Format messages for AI
                const aiMessages = aiManager.formatMessagesForAI(messages);

                // Prepare config with Velora system prompt if requested
                let finalConfig = config;
                if (config?.useVeloraMode) {
                    const veloraPrompt = prepareVeloraPrompt();
                    finalConfig = {
                        ...config,
                        systemPrompt: veloraPrompt
                    };
                }

                // Generate AI response
                const response = await aiManager.generateResponse(aiMessages, finalConfig);

                if (!response.success) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: response.error || "Failed to generate AI response"
                    });
                }

                return {
                    success: true,
                    content: response.content,
                    provider: config?.provider || 'gemini'
                };

            } catch (error) {
                if (error instanceof TRPCError) {
                    throw error;
                }
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to generate AI response"
                });
            }
        }),

    getAvailableProviders: protectedProcedure
        .query(async () => {
            try {
                const providers = aiManager.getAvailableProviders();
                return {
                    success: true,
                    providers
                };
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to get available providers"
                });
            }
        }),

    updateAIConfig: protectedProcedure
        .input(z.object({
            provider: z.enum(['gemini', 'openai', 'claude']).optional(),
            model: z.string().optional(),
            temperature: z.number().min(0).max(2).optional(),
            maxTokens: z.number().positive().optional(),
            systemPrompt: z.string().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx;

            try {
                aiManager.updateDefaultConfig(input);
                
                return {
                    success: true,
                    message: "AI configuration updated successfully"
                };

            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to update AI configuration"
                });
            }
        })
});
