import { GoogleGenAI, Type, Chat, Modality } from "@google/genai";
import type { Book } from '../types';

const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY,
  import.meta.env.VITE_GEMINI_API_KEY2,
  import.meta.env.VITE_GEMINI_API_KEY3,
].filter(Boolean); // Filter out any undefined keys

if (API_KEYS.length === 0) {
  throw new Error("At least one API_KEY environment variable must be set");
}

// Create AI instances for each key
const aiInstances = API_KEYS.map(key => new GoogleGenAI({ apiKey: key }));

export const getBookSuggestions = async (goal: string, excludeTitles: string[] = [], count: number = 6): Promise<Omit<Book, 'coverImageUrl'>[]> => {
  let prompt = `Based on the goal "${goal}", suggest ${count} self-help or relevant books. For each book, provide a title, author, a 13-digit ISBN (with no hyphens, crucial for cover fetching), a concise description (1-2 sentences), a list of 3-4 key takeaways, and a list of 2-3 expected outcomes after reading.`;

  if (excludeTitles.length > 0) {
    prompt += ` Do not suggest any of the following books, as the user has already seen them: ${excludeTitles.join(', ')}.`;
  }

  try {
    const response = await aiInstances[0].models.generateContent({ // Use first key for now, will be updated for batches
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the book.",
              },
              author: {
                type: Type.STRING,
                description: "The author of the book.",
              },
              isbn: {
                type: Type.STRING,
                description: "The 13-digit ISBN of the book, without hyphens.",
              },
              description: {
                type: Type.STRING,
                description: "A concise 1-2 sentence description of the book.",
              },
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 3-4 key takeaways from the book."
              },
              outcomes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 2-3 expected outcomes after reading the book."
              }
            },
            required: ["title", "author", "isbn", "description", "keyTakeaways", "outcomes"],
          },
        },
      },
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);
    return parsed || [];
  } catch (error) {
    console.error("Error fetching book suggestions:", error);
    return [];
  }
};

export const getBookSuggestionsBatch = async (goal: string, excludeTitles: string[] = [], batchSize: number = 2): Promise<Omit<Book, 'coverImageUrl'>[]> => {
  const batches = [];
  const totalBatches = Math.ceil(6 / batchSize); // Always aim for 6 books total

  for (let i = 0; i < totalBatches; i++) {
    const keyIndex = i % aiInstances.length;
    const ai = aiInstances[keyIndex];

    let prompt = `Based on the goal "${goal}", suggest ${batchSize} self-help or relevant books. For each book, provide a title, author, a 13-digit ISBN (with no hyphens, crucial for cover fetching), a concise description (1-2 sentences), a list of 3-4 key takeaways, and a list of 2-3 expected outcomes after reading.`;

    if (excludeTitles.length > 0) {
      prompt += ` Do not suggest any of the following books, as the user has already seen them: ${excludeTitles.join(', ')}.`;
    }

    batches.push(
      (async () => {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                      description: "The title of the book.",
                    },
                    author: {
                      type: Type.STRING,
                      description: "The author of the book.",
                    },
                    isbn: {
                      type: Type.STRING,
                      description: "The 13-digit ISBN of the book, without hyphens.",
                    },
                    description: {
                      type: Type.STRING,
                      description: "A concise 1-2 sentence description of the book.",
                    },
                    keyTakeaways: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "A list of 3-4 key takeaways from the book."
                    },
                    outcomes: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "A list of 2-3 expected outcomes after reading the book."
                    }
                  },
                  required: ["title", "author", "isbn", "description", "keyTakeaways", "outcomes"],
                },
              },
            },
          });

          const jsonString = response.text;
          const parsed = JSON.parse(jsonString);
          return parsed || [];
        } catch (error) {
          console.error(`Error fetching batch ${i + 1}:`, error);
          return []; // Return empty array on failure to allow other batches to succeed
        }
      })()
    );
  }

  const results = await Promise.all(batches);
  const allBooks = results.flat();

  // Remove duplicates based on title
  const seenTitles = new Set<string>();
  const uniqueBooks = allBooks.filter(book => {
    if (seenTitles.has(book.title)) {
      return false;
    }
    seenTitles.add(book.title);
    return true;
  });

  return uniqueBooks.slice(0, 6); // Ensure we return at most 6 books
};

export const generateBookCoverImage = async (title: string, description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Generate a minimalist, abstract book cover for a book titled "${title}". The book is about: "${description}". The cover should be symbolic and visually striking, avoiding literal text or representations of people. Use a sophisticated and modern color palette. Focus on concept, not detail.`,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data found in Gemini response.");
  } catch (error) {
    console.error("Error generating book cover:", error);
    throw error;
  }
};


export const startDeepUnderstandingChat = (bookTitle: string, userGoal: string): Chat => {
  const chat = aiInstances[0].chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert coach helping a user apply the principles of the book "${bookTitle}" to their personal goal: "${userGoal}". Your role is to foster deep understanding through Socratic questioning.
      1. Start with a broad question connecting the book's main theme to the user's goal.
      2. Based on the user's response, assess their level of understanding (surface-level or deep).
      3. If their understanding is surface-level, ask clarifying questions or for specific examples from the book.
      4. If their understanding is deep, challenge them with situational or actionable questions. For example, 'Imagine you face [common obstacle related to goal]. How would you apply the principle of [book concept] to overcome it?'
      5. Keep your questions concise and focused on one concept at a time. Guide the user, don't just lecture them. Start the conversation now with your first question.`,
    },
  });
  return chat;
};