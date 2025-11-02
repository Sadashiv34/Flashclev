
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
        // Try multiple search strategies for better cover image results
        const searchQueries = [
            encodeURIComponent(`${bookDetailsFromAI.title} ${bookDetailsFromAI.author}`),
            encodeURIComponent(bookDetailsFromAI.title),
            encodeURIComponent(`${bookDetailsFromAI.author} ${bookDetailsFromAI.title}`)
        ];

        for (const searchQuery of searchQueries) {
            const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&fields=cover_i,title,author_name&limit=5`);
            if (response.ok) {
                const searchData = await response.json();
                // Find the best match by checking title similarity
                for (const doc of searchData.docs || []) {
                    if (doc.cover_i) {
                        // Simple title matching - could be improved with more sophisticated matching
                        const docTitle = (doc.title || '').toLowerCase();
                        const searchTitle = bookDetailsFromAI.title.toLowerCase();
                        if (docTitle.includes(searchTitle) || searchTitle.includes(docTitle)) {
                            coverImageUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
                            break;
                        }
                    }
                }
                if (coverImageUrl !== `https://picsum.photos/seed/${encodeURIComponent(bookDetailsFromAI.title)}/300/450`) {
                    break; // Found a good match, stop searching
                }
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
            systemInstruction: `You are a helpful AI assistant for deep book discussions. Focus on ${context}.

Key guidelines:
- Ask thoughtful questions to deepen understanding
- Be conversational and encouraging
- Always end your response with exactly ONE clear question
- Keep responses concise but meaningful
- Help users connect book concepts to real life

Start by asking an engaging question about the book/chapter.`,
        },
    });
};
