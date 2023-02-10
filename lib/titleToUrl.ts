export const titleToUrl = (title: string): string => {
  return title.replaceAll(' ', '-').toLowerCase()
}
