## About P(ai)nt-it
P(ai)nt-it use openai's [DALL-E-2](https://openai.com/dall-e-2/) image variant system to generate new images based on a provided image URL.

## Features
- Submit PNG/JPG image URL and displays new variants of provided image
- Type checks URL in /api route and passes buffer to openai (nothing is saved)
- Uses Tailwindcss/css

## TO-DO
- Add drawable canvas to create images to send to DALL-E-2
- Allow for image uploading
- Generate additional generations of images easier

## Getting Started

First, create and add your openai api key to the `.env` file.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app ruinning.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js and openai, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [OpenAI DALL-E-2](https://openai.com/dall-e-2/) - an ai system for image generation.
