import { GoogleGenAI, Type } from "@google/genai";

const reviewSchema = {
    type: Type.OBJECT,
    properties: {
        review: {
            type: Type.STRING,
            description: "A detailed code review in Markdown format. It should include a summary, and categorized feedback (Critical, Major, Minor)."
        },
        optimalCode: {
            type: Type.STRING,
            description: "The most optimal and correct version of the provided code. This code should be clean, efficient, and free of the identified issues."
        }
    },
    required: ["review", "optimalCode"]
};


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
You must provide your response as a JSON object that matches the specified schema.
1.  **'review' field**: Contains the full review in Markdown. Start with a high-level summary. Then, create sections for "Critical Issues", "Major Suggestions", and "Minor Nitpicks". Be specific and provide code examples where necessary.
2.  **'optimalCode' field**: Contains the complete, corrected, and optimized version of the user's code.

Here is the code to review:
\`\`\`${language}
${code}
\`\`\`
`;
}

export async function reviewCode(code: string, language: string): Promise<{ review: string, optimalCode: string }> {
    const apiKey = "AIzaSyBGmvydXzJOsGOJrtnR16RyGRSAl_vG9rU";
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey });

    try {
        const prompt = buildPrompt(code, language);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: reviewSchema
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get review from Gemini API.");
    }
};