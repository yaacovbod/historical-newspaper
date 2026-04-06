import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fffdf7' }}>
      <div className="flex items-center px-6 py-3" style={{ background: '#f5f0e8', borderBottom: '1px solid #c9b99a' }}>
        <Link href="/" style={{ color: '#8a6a50', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none' }}>
          ← חזור לדף הראשי
        </Link>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'inherit', fontSize: '2rem', fontWeight: 800, color: '#2c1810', marginBottom: '0.5rem' }}>
          תנאי שימוש וכתב ויתור
        </h1>
        <div style={{ width: '60px', height: '2px', background: '#8b4513', marginBottom: '2rem' }} />

        <div style={{ color: '#2c1810', lineHeight: '1.9', fontSize: '1rem' }} className="space-y-6">

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>אחריות על השימוש</h2>
            <p>
              מחולל העיתון ההיסטורי הוא כלי עזר חינוכי המיועד לתלמידי הבגרות הגמישה. התוכן המיוצר על ידי המערכת נוצר באמצעות בינה מלאכותית
              ועשוי להכיל אי-דיוקים היסטוריים, שגיאות עובדתיות, או ניסוחים שאינם מדויקים. האחריות הבלעדית לבחינת התוכן,
              לאימותו ולשימוש בו חלה על המשתמש בלבד.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>כתב ויתור</h2>
            <p>
              בעל האתר אינו אחראי לכל נזק, ישיר או עקיף, שייגרם כתוצאה מהשימוש בתוכן המיוצר במערכת זו, לרבות שימוש לצרכי הגשה
              אקדמית, בחינות, או כל מטרה אחרת. הכתבות המיוצרות אינן מהוות מקור היסטורי מוסמך ואין להסתמך עליהן בלעדית.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>קניין רוחני</h2>
            <p>
              כל הזכויות על מערכת מחולל העיתון ההיסטורי, עיצובה, ממשקה ותשתיתה הטכנולוגית שמורות ליעקב קדם.
              מותר להשתמש בקוד המקור לצרכים חינוכיים ולהתאימו לשימוש עם תלמידים, בתנאי שהשימוש אינו מסחרי.
              אין לעשות שימוש מסחרי בכלי זה או בחלקים ממנו ללא אישור בכתב מראש.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>פרטיות</h2>
            <p>
              הכתבות שאתה יוצר נשמרות בשרת מאובטח ומקושרות לחשבונך. משתמשים אחרים אינם יכולים לצפות בהן.
              מנהל האתר עשוי לגשת לנתונים לצורכי תחזוקה טכנית.
              פרטי הזיהוי מנוהלים על ידי שירות Clerk בהתאם למדיניות הפרטיות שלהם.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#8b4513', marginBottom: '0.5rem' }}>יצירת קשר</h2>
            <p>
              לשאלות, הערות ופניות:{' '}
              <a href="mailto:yaacovbod@gmail.com" style={{ color: '#8b4513', fontWeight: 700 }}>
                yaacovbod@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
