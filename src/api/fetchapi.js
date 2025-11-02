import { GoogleGenAI } from "@google/genai";

const fetchContentAIResponse = async (category) => {
    const API_URL = `https://api.contentai.cloud/v1/Text/blog-articles?category=${encodeURIComponent(category)}`;
    const API_KEY = '2a00eb5b9d6b40e1b546f735e5918cdf';

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                accept: "application/json",
                "X-ContentAI-Key": API_KEY,
            },
        });

        // Handle all non-OK responses
        if (!response.ok) {
            const errText = await response.text();
            console.warn("⚠️ ContentAI API Error:", errText);

            if (response.status === 401) {
                return "⚠️ usage limit reached.";
            }

            if (response.status === 429) {
                return "⚠️ Too many requests — rate limit exceeded.";
            }

            return `❌ API Error ${response.status}: ${errText}`;
        }

        // Try to parse valid response
        const data = await response.json();

        // Handle unexpected response shape
        if (!data || !data.text) {
            console.warn("⚠️ Unexpected API response:", data);
            return "⚠️ Unexpected API response format.";
        }

        console.log("✅ ContentAI response:", data);
        return data.text;
    } catch (error) {
        console.error("❌ Network or Fetch Error:", error);
        return "❌ Network error — please check your connection or API key.";
    }
};

// src/api/fetchapi.js
async function fetchPollinationsResponse(prompt) {
    const API_URL = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;

    try {
        const res = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Handle HTTP errors explicitly
        if (!res.ok) {
            if (res.status === 429) {
                return "⚠️ Too many requests — Pollinations rate limit reached.";
            } else if (res.status >= 500) {
                return "⚠️ Pollinations server is currently unavailable.";
            }
            return `❌ API Error ${res.status}: ${res.statusText}`;
        }

        // Pollinations returns plain text response
        const text = await res.text();

        if (!text || text.trim() === "") {
            return "⚠️ Pollinations returned an empty response.";
        }

        return text;
    } catch (error) {
        console.error("❌ Pollinations Fetch Error:", error);
        return "⚠️ Unable to connect to Pollinations API. Please check your network or try again later.";
    }
}


async function fetchGeminiResponse(prompt) {
    try {
        const ai = new GoogleGenAI({ apiKey: 'AIzaSyCgWQEqSYKamPM1J3rt-v1VhfKa1pI1xUU' });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = await response.text;
        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "⚠️ Sorry, I couldn’t fetch a response right now.";
    }
}
const fetchApi = (input, model) => {
    if (model === "ContentAI") {
        return fetchContentAIResponse(input);
    }
    else if (model === "Pollinations") {
        return fetchPollinationsResponse(input);
    }
    else if (model === "Gemini") {
        return fetchGeminiResponse(input);
    }
}
export default fetchApi;