import Link from 'next/link'

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
          <div className="mb-2 text-xs tracking-widest uppercase" style={{ color: '#8a6a50', letterSpacing: '0.2em' }}>
            תוכנית הבגרויות הגמישה
          </div>
          <h1 style={{ fontFamily: 'inherit', fontSize: '2rem', fontWeight: 800, color: '#2c1810', lineHeight: 1.2 }}>
            מדריך השימוש
          </h1>
          <div style={{ width: '60px', height: '2px', background: '#8b4513', margin: '0.75rem auto' }} />
          <p style={{ color: '#5c3d1e', fontSize: '1rem' }}>
            כך יוצרים עיתון היסטורי שלב אחר שלב
          </p>
        </div>

        {/* Intro box */}
        <div className="rounded-xl p-5 mb-8" style={{ background: '#fdf6e3', border: '1px solid #d4a843' }}>
          <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
            הכלי מסייע ליצור <strong>עיתון היסטורי</strong> המורכב משלוש כתבות: כתבה ראשית, כתבת משנה ודבר העורכים.
            כל כתבה נוצרת בנפרד ולפי הסדר — מהכתבה הראשית ועד לדבר העורכים שמחבר הכל יחד.
          </p>
        </div>

        <div className="space-y-8">

          {/* Step 1 */}
          <section>
            <StepHeader number="1" title="הירשם והתחבר" />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
                לחץ על "התחבר" בפינה הימנית העליונה. ניתן להירשם עם כתובת אימייל או חשבון Google.
              </p>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
                <strong>אישור תנאים:</strong> בכניסה הראשונה תתבקש לאשר את תנאי השימוש. יש לסמן "קראתי ואני מסכים/ה" וללחוץ על "המשך".
              </p>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
                <strong>קוד גישה:</strong> לאחר אישור התנאים תתבקש להזין קוד גישה שקיבלת מהמורה. הזן את הקוד וכנס לאתר.
              </p>
              <Tip>ההרשמה מאפשרת לשמור את הכתבות שלך ולחזור אליהן בכל עת דרך "הכתבות שלי".</Tip>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <StepHeader number="2" title="בחר אשכול לימודי" />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                בחר את האשכול ההיסטורי שאתה לומד. האשכול קובע אילו מושגים יהיו זמינים עבורך ומכוון את הכתבה לנושאים הרלוונטיים לבגרות.
              </p>
              <div className="space-y-3">
                <ClusterBox
                  title="לאומיות וציונות"
                  description="מושגי יסוד בלאומיות, הרצל והתנועה הציונית, לאומיות יהודית ואנטישמיות."
                />
                <ClusterBox
                  title="המאבק להקמת המדינה"
                  description="הדרך לעצמאות ישראל, מלחמת העצמאות, החלטת החלוקה והמנדט הבריטי."
                />
                <ClusterBox
                  title="סוגיות נבחרות בתולדות מדינת ישראל"
                  description="דה-קולוניאליזציה, גלי עלייה, מלחמות ישראל וחברה ישראלית."
                />
              </div>
              <Tip>אם אינך בטוח — שאל את המורה שלך לאיזה אשכול שייכת הסוגיה שאתה חוקר.</Tip>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <StepHeader number="3" title="בחר סוג כתבה" />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                יש שלושה סוגי כתבות, ומומלץ ליצור אותן לפי הסדר:
              </p>
              <div className="space-y-4">
                <ArticleTypeBox
                  label="כתבה ראשית"
                  tag="התחל מכאן"
                  tagColor="#8b4513"
                  description="הכתבה המרכזית של הגיליון. כוללת כותרת ראשית, כותרת משנה (ליד), פסקת פתיחה וגוף עם ציטוטים. זו הכתבה שמציגה את הסוגיה ההיסטורית שחקרת."
                />
                <ArticleTypeBox
                  label="כתבת משנה"
                  tag="שלב שני"
                  tagColor="#6a7c3a"
                  description='כתבה שמוסיפה זווית נוספת על הנושא. ניתן לבחור בין שלושה פורמטים: ראיון עם דמות היסטורית, מאמר דעה/פרשנות, או מכתב למערכת. גוון את ה"עיתון" עם נקודת מבט שונה.'
                />
                <ArticleTypeBox
                  label="דבר העורכים"
                  tag="לבסוף"
                  tagColor="#5a4a8a"
                  description="טור עריכה שמחבר בין כל הכתבות ומסכם את הגיליון. לפני שיוצרים אותו, מדביקים לתוכו את הכתבות שנוצרו קודם — הכלי ישתמש בהן כדי לכתוב דבר עורכים קוהרנטי."
                />
              </div>
              <Tip>צור את הכתבות בסדר: ראשית ← משנה ← דבר עורכים. כל כתבה מתבססת על הקודמת.</Tip>
            </div>
          </section>

          {/* Step 4 — News form */}
          <section>
            <StepHeader number="4א" title='מילוי הטופס — כתבה ראשית' />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <div className="space-y-4">
                <FieldExplainer
                  name="נושא / סוגיה"
                  required
                  description='שם הנושא ההיסטורי שאתה חוקר. לדוגמה: "האנטישמיות בסוף המאה ה-19" או "קונגרס בזל הראשון".'
                />
                <FieldExplainer
                  name="מושגים לשילוב"
                  required
                  description="בחר עד 4 מושגים מהרשימה שמבוססת על האשכול שבחרת. המושגים ישולבו בכתבה בצורה טבעית. אם המושג שאתה צריך אינו ברשימה — תוכל להוסיפו ידנית בשדה הטקסט שמתחת לרשימה."
                />
                <FieldExplainer
                  name="מקורות"
                  required={false}
                  description="הדבק קטעים ממקורות שעיינת בהם — ציטוטים, עדויות, תיאורים היסטוריים. המקורות עוזרים לכלי להפיק כתבה מדויקת יותר ולשלב ציטוטים אמינים. ניתן להוסיף מספר מקורות."
                />
                <FieldExplainer
                  name="הערות נוספות"
                  required={false}
                  description='שדה חופשי לכל הוראה נוספת. לדוגמה: "הדגש את הפן הכלכלי", "הכתבה מנקודת מבט תומכת", "כתוב בסגנון עיתונאי ניטרלי".'
                />
              </div>
              <Tip>ככל שתספק יותר מקורות ומידע — הכתבה תהיה מדויקת ועשירה יותר.</Tip>
            </div>
          </section>

          {/* Step 4b — Secondary form */}
          <section>
            <StepHeader number="4ב" title='מילוי הטופס — כתבת משנה' />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                הטופס דומה לכתבה הראשית, עם שלושה שדות נוספים:
              </p>
              <div className="space-y-4">
                <FieldExplainer
                  name="סוגת כתבת המשנה"
                  required
                  description="בחר את פורמט הכתבה: ראיון (שאלות ותשובות עם דמות היסטורית), מאמר דעה (ניתוח ועמדה), או מכתב למערכת (פנייה של אזרח/דמות לעיתון)."
                />
                <FieldExplainer
                  name="זווית כתבת המשנה"
                  required
                  description='תאר את הזווית הספציפית שאתה רוצה. לדוגמה: "ראיון עם הרצל אחרי הקונגרס הראשון", "מכתב מאזרח יהודי פולני", "ניתוח הסיבות לאנטישמיות".'
                />
                <FieldExplainer
                  name="מין הכותב"
                  required
                  description="בחר זכר או נקבה — הכלי ישתמש בגוף הנכון בעברית לאורך כל הכתבה."
                />
              </div>
            </div>
          </section>

          {/* Step 4c — Editorial form */}
          <section>
            <StepHeader number="4ג" title='מילוי הטופס — דבר העורכים' />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                דבר העורכים הוא כתבה מסכמת — <strong>אין טופס נושא</strong>, במקום זאת מדביקים את הכתבות שנוצרו:
              </p>
              <div className="space-y-4">
                <FieldExplainer
                  name="מין הכותב"
                  required
                  description='בחר זכר, נקבה, או צוות (לעיתון שיתופי). אם בחרת "צוות" — בחר גם רבים/רבות.'
                />
                <FieldExplainer
                  name="כתבה ראשית"
                  required
                  description='הדבק את טקסט הכתבה הראשית שנוצרה בשלב הקודם. העתק את הטקסט כולו מ"הכתבות שלי" או מהמסך לאחר היצירה.'
                />
                <FieldExplainer
                  name="כתבות משנה"
                  required={false}
                  description='לחץ על "+ הוסף כתבת משנה" עבור כל כתבת משנה שיצרת, והדבק את הטקסטים שלהן. ניתן להוסיף יותר מאחת.'
                />
              </div>
              <Tip>הכלי ישתמש בכתבות שהדבקת כדי לכתוב דבר עורכים שמתייחס לתוכן האמיתי של הגיליון שלך.</Tip>
            </div>
          </section>

          {/* Step 5 */}
          <section>
            <StepHeader number="5" title="שכלול ושמירה" />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
                לאחר יצירת הכתבה תוצג תוצאה מלאה. ניתן לבצע שינויים בעזרת שדה <strong>"שכלל את הכתבה"</strong>:
              </p>
              <ul style={{ color: '#5c3d1e', fontSize: '0.92rem', lineHeight: 1.9, paddingRight: '1.2rem', marginBottom: '0.8rem' }}>
                <li>בקש שינוי סגנון: "כתוב בצורה פחות פורמלית"</li>
                <li>הוסף תוכן: "הוסף ציטוט של הרצל"</li>
                <li>קצר או הארך: "קצר את הכתבה בשליש"</li>
                <li>תקן: "שנה את השם של הדמות ל..."</li>
              </ul>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
                הכתבה <strong>נשמרת אוטומטית</strong> בסיום היצירה תחת "הכתבות שלי" בסרגל הניווט.
              </p>
              <Tip>מגבלת הייצור היא 5 כתבות לחשבון. אם הגעת למגבלה — פנה למורה.</Tip>
            </div>
          </section>

          {/* Step 6 - My articles */}
          <section>
            <StepHeader number="6" title='הכתבות שלי' />
            <div className="rounded-xl p-6" style={{ background: '#fffdf7', border: '1px solid #c9b99a' }}>
              <p style={{ color: '#5c3d1e', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
                לחץ על "הכתבות שלי" בסרגל העליון כדי לראות את כל הכתבות שיצרת. כל כתבה מוצגת עם:
              </p>
              <ul style={{ color: '#5c3d1e', fontSize: '0.92rem', lineHeight: 1.9, paddingRight: '1.2rem', marginBottom: '0.8rem' }}>
                <li>שם האשכול וסוג הכתבה</li>
                <li>תאריך ושעת יצירה</li>
                <li>כפתור "הצג" לצפייה בטקסט המלא</li>
                <li>כפתור "העתק" להעתקת הטקסט ללוח</li>
              </ul>
              <Tip>כאשר יוצרים דבר עורכים — פתח את "הכתבות שלי" בלשונית נפרדת כדי להעתיק ממנה את הכתבות הקודמות.</Tip>
            </div>
          </section>

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

function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
        style={{ background: '#8b4513' }}
      >
        {number}
      </div>
      <h2 style={{ fontFamily: 'inherit', fontSize: '1.15rem', fontWeight: 700, color: '#2c1810', margin: 0 }}>
        {title}
      </h2>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-4 rounded-lg px-3 py-2 text-sm"
      style={{ background: '#f5f0e8', border: '1px solid #c9b99a', color: '#8a6a50' }}
    >
      💡 {children}
    </div>
  )
}

function ClusterBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg px-4 py-3" style={{ background: '#fdf6e3', border: '1px solid #d4a843' }}>
      <div style={{ fontWeight: 700, color: '#2c1810', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{title}</div>
      <div style={{ color: '#5c3d1e', fontSize: '0.88rem', lineHeight: 1.6 }}>{description}</div>
    </div>
  )
}

function ArticleTypeBox({ label, tag, tagColor, description }: { label: string; tag: string; tagColor: string; description: string }) {
  return (
    <div className="rounded-lg px-4 py-3" style={{ background: '#fdf6e3', border: '1px solid #d4a843' }}>
      <div className="flex items-center gap-2 mb-1">
        <span style={{ fontWeight: 700, color: '#2c1810', fontSize: '0.95rem' }}>{label}</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full text-white"
          style={{ background: tagColor, fontSize: '0.75rem' }}
        >
          {tag}
        </span>
      </div>
      <div style={{ color: '#5c3d1e', fontSize: '0.88rem', lineHeight: 1.6 }}>{description}</div>
    </div>
  )
}

function FieldExplainer({ name, required, description }: { name: string; required: boolean; description: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span style={{ fontWeight: 700, color: '#2c1810', fontSize: '0.92rem' }}>{name}</span>
        {required ? (
          <span style={{ color: '#c0392b', fontSize: '0.75rem' }}>חובה</span>
        ) : (
          <span style={{ color: '#8a6a50', fontSize: '0.75rem' }}>אופציונלי</span>
        )}
      </div>
      <p style={{ color: '#5c3d1e', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{description}</p>
    </div>
  )
}
