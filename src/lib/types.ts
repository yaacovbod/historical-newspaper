export interface BaseFormData {
  cluster: string
  topic: string
  selectedConcepts: string[]
  sources: string
  curriculumCluster?: string
  notes?: string
}

export interface NewsFormData extends BaseFormData {
  articleType: 'news'
}

export interface SecondaryFormData extends BaseFormData {
  articleType: 'secondary'
  subGenre: 'interview' | 'opinion' | 'letter'
  subTopic: string
  authorGender: 'male' | 'female'
}

export interface EditorialFormData {
  articleType: 'editorial'
  authorGender: 'male' | 'female' | 'plural'
  pluralGender?: 'male' | 'female'
  mainArticleText: string
  secondaryArticleTexts: string[]
  cluster: string
  curriculumCluster?: string
  notes?: string
}

export type FormData = NewsFormData | SecondaryFormData | EditorialFormData
