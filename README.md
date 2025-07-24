# Quran Kids Tales Unveiled

## Project Overview

This is a React-based educational app designed to teach children stories of the Prophets from the Quran. The app features bilingual content (English and Arabic) with engaging storytelling, progress tracking, and interactive UI components.

## Features

- Bilingual stories in English and Arabic with titles, content, and morals.
- Story cards highlighting today's story and progress.
- Toggle between showing today's story or all stories.
- Progress tracking with streaks, badges, and stories read.
- Responsive UI built with React, TypeScript, Tailwind CSS, and shadcn-ui components.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui component library

## Getting Started

### Prerequisites

- Node.js and npm installed. Recommended to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) for managing Node versions.

### Installation

```bash
git clone <YOUR_REPOSITORY_URL>
cd quran-kids-tales-unveiled-main
npm install
```

### Running the App

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port shown in the terminal) to view the app.

## Project Structure

- `src/data/stories.ts`: Contains the stories data in English and Arabic.
- `src/pages/Index.tsx`: Homepage displaying story cards and progress.
- `src/pages/Story.tsx`: Story detail page.
- `src/components/StoryCard.tsx`: UI component for individual story cards.
- `src/components/ui/`: UI components library.
- `src/assets/`: Images and assets used in the app.

## Adding New Stories

To add new stories:

1. Add the story content in both English and Arabic to `src/data/stories.ts`.
2. Add corresponding entries to the `mockStories` array in `src/pages/Index.tsx` with UI properties like duration, isCompleted, and isToday.

## Deployment

You can deploy the app using Vite's build command and host it on any static site hosting service.

```bash
npm run build
```

## Contributing

Feel free to fork the repository and submit pull requests for improvements or new features.

## License

This project is open source and available under the MIT License.

---

For more information, visit the project page on Lovable: https://lovable.dev/projects/2bc2d0b1-beef-4186-8f86-180039a4da7c
