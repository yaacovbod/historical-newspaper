@AGENTS.md

# מחולל העיתון ההיסטורי

## מה הפרויקט עושה
כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות בעברית.
המשתמש בוחר אשכול (נושא), סוג כתבה, ממלא טופס — ו-AI מייצר את הכתבה.

## Tech Stack
- Next.js App Router, TypeScript, Tailwind CSS
- Clerk — אוטנטיקציה (עברית/RTL)
- Upstash Redis — שמירת כתבות
- Claude API — יצירת תוכן

## מבנה קבצים חשוב
- `src/app/page.tsx` — עמוד ראשי, ניהול ה-stage flow
- `src/lib/clusters.ts` — רשימת האשכולות (נושאי הבגרות)
- `src/lib/prompts.ts` — הפרומפטים ל-Claude
- `src/components/` — טפסים לפי סוג כתבה

## Flow
cluster → select (סוג כתבה) → form → loading → result

## סגנון
- Golden Hour theme — צבעי זהב וענבר (`#C8860A`, `#D4A843`, `#F8EDD4`)
- RTL, עברית, פונט Suez One
- צבעים ב-inline styles (לא Tailwind classes)

## כללים
- אל תשנה את ה-Clerk config בלי לשאול
- הפרויקט בעברית — שמור על כל הטקסטים בעברית
