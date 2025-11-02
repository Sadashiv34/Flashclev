# Flashclev - Deep Understanding App

Flashclev is an AI-powered application that helps users gain deep understanding of books through interactive conversations and thoughtful questions.

## Features

- **Book Analysis**: Enter any book title and get detailed analysis
- **AI-Powered Conversations**: Interactive chat with AI to explore book themes and concepts
- **Chapter Selection**: Focus on specific chapters or explore the entire book
- **Real-Life Application**: Get actionable insights and practical applications

## Run Locally

**Prerequisites:** Node.js

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Set your Gemini API key in `.env.local`:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `VITE_API_KEY`: Your Gemini API key
3. **Deploy**: Vercel will automatically build and deploy your app

### Vercel Configuration

The project includes a `vercel.json` configuration file that ensures proper deployment:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI**: Google Gemini API
- **Deployment**: Vercel
- **Icons**: Custom SVG components

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Google Gemini API key | Yes |

Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
