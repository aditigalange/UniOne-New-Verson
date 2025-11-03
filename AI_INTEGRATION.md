# AI Chatbot Integration Guide

Currently, the AI chatbot uses simulated responses. This guide explains how to integrate with real AI services for production use.

## Option 1: OpenAI Integration (Recommended)

OpenAI provides powerful AI models perfect for educational assistance.

### Setup Steps:

1. **Get OpenAI API Key:**
   - Go to https://platform.openai.com/
   - Sign up or login
   - Go to API Keys section
   - Create a new secret key
   - **Save this key securely** (you won't see it again)

2. **Install OpenAI SDK:**
   ```bash
   npm install openai
   ```

3. **Update the Chatbot Component:**
   - Open `src/components/AIChatbot.tsx`
   - Replace the `simulateAIResponse` function with:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Add this to .env file
  dangerouslyAllowBrowser: true // Only for client-side usage
});

const getAIResponse = async (question: string, context: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" for better responses
      messages: [
        {
          role: "system",
          content: `You are a helpful study assistant for university students. You help with ${context.toLowerCase()}. Be concise, accurate, and encouraging.`
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0].message.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
};
```

4. **Create Environment File:**
   - Create `.env` file in project root:
   ```
   VITE_OPENAI_API_KEY=your-api-key-here
   ```
   - **Important:** Add `.env` to `.gitignore` (already done)

5. **Update the handleSend function:**
   Replace `simulateAIResponse` call with `getAIResponse`

### Cost: ~$0.002 per conversation (very cheap for student use)

---

## Option 2: Anthropic Claude Integration

Claude is excellent for educational content.

### Setup:

1. **Get API Key:**
   - Go to https://console.anthropic.com/
   - Create account and get API key

2. **Install SDK:**
   ```bash
   npm install @anthropic-ai/sdk
   ```

3. **Update Chatbot:**
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

const getAIResponse = async (question: string, context: string) => {
  const message = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 500,
    messages: [{
      role: "user",
      content: `As a study assistant for ${context}, help with: ${question}`
    }]
  });
  
  return message.content[0].text;
};
```

---

## Option 3: Free AI Services

### Hugging Face (Free Tier Available):

```bash
npm install @huggingface/inference
```

```typescript
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HF_API_KEY);

const getAIResponse = async (question: string) => {
  const response = await hf.textGeneration({
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    inputs: `Help a student: ${question}`,
    parameters: { max_new_tokens: 200 }
  });
  
  return response.generated_text;
};
```

---

## Option 4: Self-Hosted (Advanced)

For maximum control and no API costs:

1. Use **Ollama** to run models locally
2. Use **LLaMA 2** or **Mistral** models
3. Requires server infrastructure

---

## Security Best Practices

1. **Never expose API keys in code**
   - Always use environment variables
   - Use `.env` file (already in .gitignore)
   - For production, use Vercel/Netlify environment variables

2. **Rate Limiting:**
   - Add rate limiting to prevent abuse
   - Limit requests per user per day

3. **Content Filtering:**
   - Filter inappropriate content
   - Monitor AI responses

---

## Recommended Setup for Production

1. **Start with OpenAI GPT-3.5-turbo** (cheapest, best quality)
2. **Set up usage monitoring** in OpenAI dashboard
3. **Add rate limiting** (max 20 messages per student per day)
4. **Cache common responses** to reduce API calls

---

## Cost Comparison

| Service | Cost per 1K messages | Quality | Setup Difficulty |
|---------|---------------------|---------|------------------|
| OpenAI GPT-3.5 | ~$2 | Excellent | Easy |
| OpenAI GPT-4 | ~$30 | Best | Easy |
| Claude | ~$3 | Excellent | Easy |
| Hugging Face | Free (limited) | Good | Medium |
| Self-Hosted | Free | Good | Hard |

**Recommendation:** Start with GPT-3.5-turbo for best balance of cost and quality.

---

## Testing

After integration:
1. Test with various question types
2. Monitor API usage in dashboard
3. Check response quality
4. Ensure error handling works

---

**Note:** The current simulated AI works fine for development and testing. Integrate real AI before launching to production.
