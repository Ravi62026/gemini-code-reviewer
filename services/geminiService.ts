import { ChatGroq } from "@langchain/groq";

function buildPrompt(code: string, language: string): string {
    return `
You are an expert senior software engineer and an automated code review tool.
Your task is to provide a comprehensive, constructive, and actionable code review, and then provide the most optimal version of the code.

Analyze the following ${language} code for:
- **Bugs and Errors:** Identify potential runtime errors, logic flaws, and edge cases that are not handled.
- **Security Vulnerabilities:** Look for common security issues like injection vulnerabilities, insecure handling of data, etc.
- **Performance Issues:** Highlight any performance bottlenecks, inefficient algorithms, or memory leaks.
- **Best Practices & Readability:** Check for adherence to language-specific conventions, code style, and overall readability. Suggest improvements for clarity and maintainability.
- **Simplification & Modernization:** Suggest ways to simplify complex logic and use modern language features.

**Output Requirements:**
You must provide your response as a JSON object with exactly these two fields:
1.  **'review'**: Contains the full review in Markdown. Start with a high-level summary. Then, create sections for "Critical Issues", "Major Suggestions", and "Minor Nitpicks". Be specific and provide code examples where necessary.
2.  **'optimalCode'**: Contains the complete, corrected, and optimized version of the user's code.

Here is the code to review:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON in this exact format:
{
  "review": "your markdown review here",
  "optimalCode": "your optimized code here"
}
`;
}

export async function reviewCode(code: string, language: string): Promise<{ review: string, optimalCode: string }> {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
        throw new Error("VITE_GROQ_API_KEY environment variable not set. Please add it to your .env file.");
    }

    const llm = new ChatGroq({
        apiKey: apiKey,
        model: "openai/gpt-oss-20b",
        temperature: 0.3,
    });

    try {
        const prompt = buildPrompt(code, language);

        const messages = [
            {
                role: "system",
                content: "You are an expert code reviewer. Always respond with valid JSON containing 'review' and 'optimalCode' fields."
            },
            {
                role: "user",
                content: prompt
            }
        ];

        // Invoke with response_format to get JSON output
        const response = await llm.invoke(messages, {
            response_format: { type: "json_object" },
        });

        // Parse the JSON response
        const jsonText = typeof response.content === 'string'
            ? response.content
            : JSON.stringify(response.content);

        const result = JSON.parse(jsonText);

        // Validate the response has required fields
        if (!result.review || !result.optimalCode) {
            throw new Error("Invalid response format from AI");
        }

        return {
            review: result.review,
            optimalCode: result.optimalCode
        };

    } catch (error) {
        console.error("Error calling Groq API:", error);
        throw new Error("Failed to get review from Groq API. Please check your API key and try again.");
    }
}
