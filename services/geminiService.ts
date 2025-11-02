
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { BookDetails } from '../types';

if (!import.meta.env.VITE_API_KEY) {
    console.error("VITE_API_KEY environment variable not set. Please check your environment configuration.");
    // Instead of throwing, we'll handle this gracefully
}

const ai = import.meta.env.VITE_API_KEY ? new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY }) : null;

const bookDetailsSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "The full title of the book, corrected for any typos."
        },
        author: {
            type: Type.STRING,
            description: "The primary author of the book."
        },
        chapters: {
            type: Type.ARRAY,
            description: "A list of 5-10 key chapters or main sections of the book.",
            items: {
                type: Type.STRING,
            },
        },
    },
    required: ["title", "author", "chapters"],
};


export const getBookDetails = async (bookName: string): Promise<BookDetails> => {
    let bookDetailsFromAI: Omit<BookDetails, 'coverImageUrl'>;

    if (!ai) {
        console.warn("Gemini AI not initialized - using fallback data");
        bookDetailsFromAI = {
            title: bookName,
            author: "Unknown Author",
            chapters: ["Introduction", "Chapter 1", "Chapter 2", "Chapter 3", "Conclusion"],
        };
    } else {
        try {
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analyze the book title "${bookName}". Provide its accurately corrected official title, primary author, and a list of its main chapters or sections.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: bookDetailsSchema,
                },
            });

            const jsonString = result.text;
            const parsed = JSON.parse(jsonString);

            if (parsed && parsed.title && parsed.author && parsed.chapters) {
                bookDetailsFromAI = parsed;
            } else {
                throw new Error("Invalid data structure received from API.");
            }

        } catch (error) {
            console.error("Error fetching book details from Gemini:", error);
            // Fallback for Gemini failure
            bookDetailsFromAI = {
                title: bookName,
                author: "Unknown Author",
                chapters: ["Introduction", "Chapter 1", "Chapter 2", "Chapter 3", "Conclusion"],
            };
        }
    }

    // Now, fetch the cover image from Open Library
    let coverImageUrl = `https://picsum.photos/seed/${encodeURIComponent(bookDetailsFromAI.title)}/300/450`; // Default fallback

    try {
        const searchQuery = encodeURIComponent(`${bookDetailsFromAI.title} ${bookDetailsFromAI.author}`);
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&fields=cover_i&limit=1`);
        if (response.ok) {
            const searchData = await response.json();
            const coverId = searchData.docs?.[0]?.cover_i;
            if (coverId) {
                coverImageUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            }
        }
    } catch (error) {
        console.error("Error fetching book cover from Open Library:", error);
        // Silently fail and use the fallback.
    }

    return {
        ...bookDetailsFromAI,
        coverImageUrl,
    };
};

export const startChatSession = (bookName: string, chapter: string = 'All'): Chat | null => {
    if (!ai) {
        console.warn("Gemini AI not initialized - cannot start chat session");
        return null;
    }

    const context = chapter === 'All'
        ? `the entire book "${bookName}"`
        : `the chapter "${chapter}" from the book "${bookName}"`;

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are Book Deep Dive AI, an expert guide helping users understand books on a profound level. Your goal is to foster a conversation that moves beyond simple comprehension to application and personal transformation. Your current focus is on ${context}.

            Your tasks:
            1.  Start with a broad, engaging question about ${context}.
            2.  Listen to the user's response carefully.
            3.  Ask follow-up questions that are a mix of:
                - **Clarity Questions:** To ensure they understand key concepts from ${context}. (e.g., "How would you explain [key concept] in your own words?")
                - **Deep Understanding Questions:** To explore implications and connections within ${context}. (e.g., "Why do you think the author emphasized that point?")
                - **Situational Questions:** To bridge theory and practice using ideas from ${context}. (e.g., "Imagine a situation where [scenario]. How would you apply the book's advice?")
                - **Actionable Questions:** To encourage real-world change based on ${context}. (e.g., "What's one small change you could make this week based on this chapter?")
            4.  Keep your responses concise, conversational, and encouraging. End each response with a single, clear question. Do not mention the book or chapter name in every question unless it's natural.`,
        },
    });
};
