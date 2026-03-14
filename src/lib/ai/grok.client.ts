import axios from "axios"

export class GroqClient {

    private client
    private model = "llama-3.1-8b-instant"

    constructor(
        apiKey: string,
        baseUrl: string
    ) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        })
    }

    async generate(
        prompt: string,
        maxTokens = 500,
        temperature = 0.7
    ): Promise<string> {

        try {
            const response = await this.client.post("/chat/completions", {
                model: this.model,
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: maxTokens,
                temperature
            })

            return response.data.choices[0].message.content

        } catch (error: any) {

            if (error.response) {
                console.error("Groq error:", error.response.data)
                throw new Error(
                    `Groq API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
                )
            }

            console.error("Connection error:", error.message)
            throw new Error(`Connection error with Groq: ${error.message}`)
        }
    }
}