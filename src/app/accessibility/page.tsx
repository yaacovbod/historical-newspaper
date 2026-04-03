import Link from 'next/link'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fffdf7' }}>
      <div className="flex items-center px-6 py-3" style={{ background: '#f5f0e8', borderBottom: '1px solid #c9b99a' }}>
        <Link href="/" style={{ color: '#8a6a50', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none' }}>
          ← חזור לדף הראשי
        </Link>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'inherit', fontSize: '2rem', fontWeight: 800, color: '#2c1810', marginBottom: '0.5rem' }}>
          הצהרת נגישות
        </h1>
        <div style={{ width: '60px', height: '2px', background: '#8b4513', marginBottom: '2rem' }} />

        <div style={{ color: '#2c1810', lineHeight: '1.9', fontSize: '1rem' }} className="space-y-6">

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>כללי</h2>
            <p>
              אתר מחולל העיתון ההיסטורי פועל לאפשר חווית שימוש נגישה לכלל המשתמשים, לרבות אנשים עם מוגבלויות,
              בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013,
              ועל פי המלצות תקן WCAG 2.1 ברמה AA.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>רמת הנגישות</h2>
            <p>
              האתר עומד בחלק מדרישות תקן WCAG 2.1 ברמה AA. אנו פועלים לשיפור מתמיד של הנגישות.
              האתר משתמש בתוסף הנגישות UserWay המספק כלים מתקדמים להתאמת חווית הגלישה.
            </p>
            <ul style={{ paddingRight: '1.2rem', marginTop: '0.5rem' }} className="space-y-1">
              <li>האתר בנוי בשפה העברית עם תמיכה מלאה בכיוון קריאה מימין לשמאל (RTL)</li>
              <li>ניתן לנווט באתר באמצעות מקלדת בלבד</li>
              <li>הטקסטים באתר ניתנים להגדלה ללא אובדן תוכן</li>
              <li>ניגודיות צבעים עומדת בדרישות התקן</li>
              <li>כפתורים ואלמנטים אינטראקטיביים מסומנים בצורה ברורה</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>מה עדיין אינו נגיש</h2>
            <ul style={{ paddingRight: '1.2rem' }} className="space-y-1">
              <li>חלק מהתכנים שנוצרים על ידי בינה מלאכותית עשויים לא לכלול תיאורי תמונות</li>
              <li>ממשק הכניסה וההרשמה מסופק על ידי Clerk ועשוי לא לעמוד בכל דרישות הנגישות</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>פנייה בנושא נגישות</h2>
            <p>
              נתקלתם בבעיית נגישות או זקוקים להתאמה? אנא פנו אל רכז הנגישות:
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>יעקב קדם</strong><br />
              דוא"ל:{' '}
              <a href="mailto:yaacovbod@gmail.com" style={{ color: '#8b4513', fontWeight: 700 }}>
                yaacovbod@gmail.com
              </a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              נשתדל להשיב לפנייתך בתוך 5 ימי עסקים.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>תאריך עדכון ההצהרה</h2>
            <p>הצהרה זו עודכנה לאחרונה באפריל 2026.</p>
          </section>

        </div>
      </main>
    </div>
  )
}
