export const stripHtml = (str: string): string => {
  return str.replace(/(<([^>]+)>)/gi, '')
}
