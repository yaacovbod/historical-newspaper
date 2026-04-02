export interface BaseFormData {
  cluster: string
  topic: string
  teamSize: number
  authorGender: 'male' | 'female' | 'plural'
  selectedConcepts: string[]
  sources: string
  curriculumCluster?: string
}

export interface NewsFormData extends BaseFormData {
  articleType: 'news'
}

export interface SecondaryFormData extends BaseFormData {
  articleType: 'secondary'
  subGenre: 'interview' | 'opinion' | 'letter'
  subTopic: string
}

export interface EditorialFormData {
  articleType: 'editorial'
  teamSize: number
  authorGender: 'male' | 'female' | 'plural'
  mainArticleText: string
  secondaryArticleTexts: string[]
  cluster: string
  curriculumCluster?: string
}

export type FormData = NewsFormData | SecondaryFormData | EditorialFormData
