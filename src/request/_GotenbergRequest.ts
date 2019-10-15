import { Document } from '../document/_Document'

export type FormValues = {
  [field: string]: number | string | boolean | undefined
}

export type FormFiles = {
  [field: string]: Document | undefined
}

export interface GotenbergRequest {
  getPostURL(): string
  getFormValues(): FormValues | void
  getFormFiles(): FormFiles | void
}
