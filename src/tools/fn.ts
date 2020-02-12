/**
 * Some short useful functions
 */

export const setProperty = (...fields: string[]) => (...values: any[]) => (object: any) => {
  for (let i = 0; i < fields.length; i++) {
    object[fields[i]] = values[i]
  }
}
