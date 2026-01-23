# CLAUDE.md - ExamCanada.online

## Project Overview

ExamCanada.online is a free practice test platform for Canadian government and professional certification exams. The platform provides unlimited practice tests for exams like ICBC driving tests, Ontario G1, Canadian Citizenship test, FoodSafe, and more. Monetization is through Google AdSense.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 + React 18 (App Router) |
| Styling | Tailwind CSS |
| Database | Firebase Firestore |
| Storage | Firebase Storage (images) |
| Auth (Future) | Firebase Auth |
| Hosting | Vercel |
| Analytics | Google Analytics 4 (via GTM) |
| Ads | Google AdSense |

## Project Structure

```
examcanada/
├── app/
│   ├── layout.tsx                # Root layout (GTM, AdSense script)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Tailwind imports
│   ├── [exam]/
│   │   ├── page.tsx              # Exam landing page
│   │   ├── test/
│   │   │   └── page.tsx          # Quiz page
│   │   └── results/
│   │       └── page.tsx          # Results page
│   └── category/
│       └── [category]/
│           └── page.tsx          # Category listing page
│
├── components/
│   ├── AdUnit.tsx                # Google AdSense component
│   ├── ExamCard.tsx              # Exam preview card
│   ├── QuizQuestion.tsx          # Single question display
│   ├── ProgressBar.tsx           # Quiz progress indicator
│   ├── ResultsSummary.tsx        # Score display component
│   ├── ReviewAnswers.tsx         # Expandable answers review
│   ├── ShareButtons.tsx          # Social sharing buttons
│   ├── Header.tsx                # Site header/nav
│   └── Footer.tsx                # Site footer
│
├── lib/
│   ├── firebase.ts               # Firebase initialization
│   ├── firestore.ts              # Firestore query functions
│   └── types.ts                  # TypeScript interfaces
│
├── public/
│   ├── images/
│   │   └── signs/                # Road sign images
│   └── favicon.ico
│
├── .env.local                    # Firebase config (gitignored)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

## URL Structure

| URL | Page | Description |
|-----|------|-------------|
| `/` | `app/page.tsx` | Home page with exam cards |
| `/icbc` | `app/[exam]/page.tsx` | Exam landing page |
| `/icbc/test` | `app/[exam]/test/page.tsx` | Quiz interface |
| `/icbc/results` | `app/[exam]/results/page.tsx` | Results display |
| `/category/driving` | `app/category/[category]/page.tsx` | Category listing |

## Firestore Data Schema

### Collection: `exams`

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL slug (icbc, g1, citizenship) |
| `title` | string | Display title |
| `description` | string | Exam description for landing page |
| `passingScore` | number | Minimum % to pass (e.g., 80) |
| `questionCount` | number | Questions shown per test |
| `timeLimit` | number \| null | Time limit in minutes (null = unlimited) |
| `category` | string | driving \| citizenship \| food \| professional |
| `province` | string \| null | BC, ON, AB, or null for national |
| `icon` | string | Emoji icon for display |
| `isActive` | boolean | Whether exam is published |
| `createdAt` | timestamp | Creation timestamp |

### Collection: `questions`

| Field | Type | Description |
|-------|------|-------------|
| `examId` | string | Reference to exam document ID |
| `questionText` | string | The question |
| `imageUrl` | string \| null | Firebase Storage URL for images |
| `optionA` | string | Answer option A |
| `optionB` | string | Answer option B |
| `optionC` | string | Answer option C |
| `optionD` | string | Answer option D |
| `correctAnswer` | string | Correct answer: 'a', 'b', 'c', or 'd' |
| `explanation` | string | Why this answer is correct |
| `topic` | string | Topic category (road-signs, parking, etc.) |
| `difficulty` | string | easy \| medium \| hard |
| `isPremium` | boolean | Reserved for future premium tier |
| `createdAt` | timestamp | Creation timestamp |

### Collection: `categories`

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL slug (driving, citizenship, food) |
| `title` | string | Display title |
| `description` | string | Category description |
| `icon` | string | Emoji icon |
| `order` | number | Display order |

## TypeScript Types

All types are defined in `lib/types.ts`:

- `Exam` - Exam document structure
- `Question` - Question document structure
- `Category` - Category document structure
- `QuizState` - React state for quiz progress
- `QuizResult` - Calculated quiz results

## Key Development Patterns

### 1. Data Fetching

Use the query functions in `lib/firestore.ts`:

```typescript
import { getExamBySlug, getQuestionsByExamId } from '@/lib/firestore';

// In a Server Component or route handler
const exam = await getExamBySlug('icbc');
const questions = await getQuestionsByExamId(exam.id);
```

### 2. Quiz State Management

Quiz state is managed client-side in React state (no backend calls during test):

```typescript
interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>;  // questionId -> selected answer
  isComplete: boolean;
}
```

### 3. Question Shuffling

Questions are shuffled client-side using the `shuffleArray` helper:

```typescript
import { shuffleArray } from '@/lib/firestore';

const shuffledQuestions = shuffleArray(questions).slice(0, exam.questionCount);
```

### 4. Client Components

Use `'use client'` directive for interactive components:
- Quiz interface (`QuizQuestion.tsx`)
- AdSense component (`AdUnit.tsx`)
- Share buttons (`ShareButtons.tsx`)

### 5. Server Components

Keep data fetching in Server Components when possible:
- Exam landing pages
- Category pages
- Home page

## Environment Variables

Required in `.env.local` (never commit):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=examcanada.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=examcanada
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=examcanada.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## AdSense Integration

### Ad Placements by Page

| Page | Ad Units |
|------|----------|
| Home | 2 Leaderboards (728x90) - Top + Bottom |
| Exam Landing | 1 Leaderboard + 2 Sidebar (300x250) |
| Quiz | 1 Leaderboard (728x90) - Bottom only |
| Results | 1 Leaderboard + 2 Sidebar |

### Usage

```tsx
import AdUnit from '@/components/AdUnit';

<AdUnit slot="1234567890" format="horizontal" className="my-4" />
```

## Coding Conventions

### File Naming
- Components: PascalCase (`QuizQuestion.tsx`)
- Utilities/lib: camelCase (`firestore.ts`)
- Pages: lowercase with Next.js conventions (`page.tsx`)

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react';
import { Question } from '@/lib/types';

// 2. Type definitions (if component-specific)
interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
}

// 3. Component
export default function QuizQuestion({ question, onAnswer }: Props) {
  // State
  // Effects
  // Handlers
  // Render
}
```

### Styling
- Use Tailwind CSS utility classes
- Avoid custom CSS unless absolutely necessary
- Follow mobile-first responsive design

### Error Handling
- Use try-catch for Firestore operations
- Display user-friendly error messages
- Log errors for debugging

## Security Considerations

### Firestore Rules
- Exams and categories: Public read, no write
- Questions: Read free questions only (`isPremium == false`), no write
- All data management through Firebase Console or admin scripts

### Client-Side
- Never expose Firebase Admin credentials
- All `NEXT_PUBLIC_` variables are safe to expose
- Quiz answers calculated client-side (no cheating concerns for free tier)

## SEO Guidelines

### Meta Tags
Each exam landing page should include:
- Unique title: `{Exam Name} Practice Test - Free Online | ExamCanada`
- Description: 500+ character description with keywords
- Open Graph tags for social sharing

### Content
- Each landing page: 500+ words of SEO content
- Unique content per exam (no duplicates)
- Internal linking between related exams

## Testing Checklist

Before deploying changes:
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] Quiz flow works end-to-end (start → answer → submit → results)
- [ ] Mobile responsive design works
- [ ] Ad units load correctly (test with AdSense test mode)
- [ ] Firestore queries return expected data

## Common Tasks

### Adding a New Exam

1. Add exam document to Firestore `exams` collection
2. Add questions to `questions` collection with matching `examId`
3. Verify exam appears on home page and category page
4. Test complete quiz flow

### Adding Questions

Questions can be added via:
1. Firebase Console (manual)
2. Admin script (bulk import)
3. AI-assisted generation from official study materials

### Question JSON Format

```json
{
  "examId": "abc123",
  "questionText": "What does a yield sign mean?",
  "imageUrl": null,
  "optionA": "Stop completely and wait",
  "optionB": "Slow down and yield to traffic",
  "optionC": "Speed up to merge quickly",
  "optionD": "Honk your horn",
  "correctAnswer": "b",
  "explanation": "A yield sign means you must slow down and give way to traffic already on the road you are entering.",
  "topic": "road-signs",
  "difficulty": "easy",
  "isPremium": false
}
```

## Deployment

### Vercel

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase

- Firestore rules deployed via Firebase CLI
- Storage rules for image access
- Monitor usage in Firebase Console (stay within free tier limits)

## Future Considerations

### Premium Features (Post-MVP)
- Firebase Auth for user accounts
- Premium question packs (`isPremium: true`)
- Ad-free experience
- Progress tracking

### Performance
- Implement caching for frequently accessed exams
- Consider ISR (Incremental Static Regeneration) for landing pages
- Monitor Firebase read counts to stay within free tier

## Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google AdSense](https://support.google.com/adsense)
