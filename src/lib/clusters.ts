import { HISTORICAL_CONCEPTS } from './concepts'
import { HAKAMAT_MEDINA_CONCEPTS } from './concepts-hakamat-medina'
import { DECOLONIZATION_CONCEPTS } from './concepts-decolonization'

export interface Cluster {
  id: string
  title: string
  subtitle: string
  gradient: string
  concepts: string[]
}

export const CLUSTERS: Cluster[] = [
  {
    id: 'leumiyut',
    title: 'לאומיות וציונות',
    subtitle: 'מושגי יסוד בלאומיות, הרצל והתנועה הציונית',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    concepts: HISTORICAL_CONCEPTS,
  },
  {
    id: 'hakamat-medina',
    title: 'המאבק להקמת המדינה',
    subtitle: 'הדרך לעצמאות ישראל',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    concepts: HAKAMAT_MEDINA_CONCEPTS,
  },
  {
    id: 'decolonization',
    title: 'סוגיות נבחרות בתולדות מדינת ישראל',
    subtitle: 'המלחמה הקרה, עלייה וחברה ישראלית',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    concepts: DECOLONIZATION_CONCEPTS,
  },
]
