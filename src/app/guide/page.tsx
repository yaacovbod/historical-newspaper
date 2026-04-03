import Link from 'next/link'

const STEPS = [
  {
    number: '1',
    title: 'הירשם והתחבר',
    description: 'לחץ על "התחבר" בפינה הימנית העליונה. הרשמה מאפשרת לשמור את הכתבות שלך ולחזור אליהן בכל עת.',
    tip: 'ניתן להירשם עם כתובת אימייל או חשבון Google.',
  },
  {
    number: '2',
    title: 'בחר אשכול לימודי',
    description: 'בחר את האשכול ההיסטורי שאתה לומד — למשל "לאומיות וציונות" או "המאבק להקמת המדינה". האשכול מכוון את הכתבה לנושאים הרלוונטיים לבגרות שלך.',
    tip: 'הבחירה תשפיע על המושגים והאירועים שיופיעו בכתבה.',
  },
  {
    number: '3',
    title: 'בחר סוג כתבה',
    description: (
      <span>
        יש שלושה סוגי כתבות:
        <ul className="mt-2 space-y-1 text-sm" style={{ color: '#5c3d1e' }}>
          <li><strong>כתבה חדשותית</strong> — הכתבה הראשית של הגיליון. כוללת כותרת, ליד ופסקאות.</li>
          <li><strong>כתבת משנה</strong> — ראיון, מאמר דעה או מכתב למערכת. זווית נוספת על הנושא.</li>
          <li><strong>דבר העורכים</strong> — טור עריכה שמחבר בין הכתבות. כתבו אותו לאחרון, הדביקו לתוכו את הכתבות הקודמות.</li>
        </ul>
      </span>
    ),
    tip: 'מומלץ להתחיל בכתבה חדשותית, אחר כך כתבת משנה, ולסיים בדבר העורכים.',
  },
  {
    number: '4',
    title: 'מלא את הטופס',
    description: 'הזן את הנושא, הבחר מושגים רלוונטיים ומלא את הפרטים הנדרשים. ככל שתתאר יותר — הכתבה תהיה מדויקת יותר.',
    tip: 'שדות המושגים עוזרים ל-AI להתמקד בתוכן הנכון לבגרות.',
  },
  {
    number: '5',
    title: 'קבל, ערוך ושמור',
    description: 'לאחר יצירת הכתבה תוכל לבקש שינויים בעזרת תיבת "שכלל את הכתבה". כשהכתבה מוכנה — היא נשמרת אוטומטית תחת "הכתבות שלי".',
    tip: 'ניתן לחזור לכתבות שמורות בכל זמן דרך הקישור "הכתבות שלי" בסרגל העליון.',
  },
]

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <div className="flex justify-between items-center px-6 py-3" style={{ background: '#f5f0e8', borderBottom: '1px solid #c9b99a' }}>
        <Link href="/" style={{ color: '#8a6a50', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none' }}>
          ← חזור לדף הבית
        </Link>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs tracking-widest uppercase" style={{ color: '#8a6a50', fontFamily: 'inherit', letterSpacing: '0.2em' }}>
            תוכנית הבגרויות הגמישה
          </div>
          <h1 style={{ fontFamily: 'inherit', fontSize: '2rem', fontWeight: 800, color: '#2c1810', lineHeight: 1.2 }}>
            מדריך השימוש
          </h1>
          <div style={{ width: '60px', height: '2px', background: '#8b4513', margin: '0.75rem auto' }} />
          <p style={{ color: '#5c3d1e', fontFamily: 'inherit', fontSize: '1rem' }}>
            כך יוצרים כתבה היסטורית בחמישה שלבים
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-xl p-6"
              style={{ background: '#fffdf7', border: '1px solid #c9b99a', boxShadow: '0 2px 8px rgba(44,24,16,0.06)' }}
            >
              <div className="flex items-start gap-4">
                {/* Step number */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: '#8b4513' }}
                >
                  {step.number}
                </div>

                <div className="flex-1">
                  <h2 style={{ fontFamily: 'inherit', fontSize: '1.1rem', fontWeight: 700, color: '#2c1810', marginBottom: '0.4rem' }}>
                    {step.title}
                  </h2>
                  <div style={{ color: '#5c3d1e', fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {step.description}
                  </div>
                  {step.tip && (
                    <div
                      className="mt-3 rounded-lg px-3 py-2 text-sm"
                      style={{ background: '#f5f0e8', border: '1px solid #c9b99a', color: '#8a6a50', fontFamily: 'inherit' }}
                    >
                      💡 {step.tip}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-block rounded-xl px-8 py-3 font-bold text-white transition-all hover:brightness-90"
            style={{ background: '#8b4513', fontFamily: 'inherit', fontSize: '1rem', textDecoration: 'none' }}
          >
            התחל ליצור כתבה
          </Link>
        </div>
      </main>
    </div>
  )
}
