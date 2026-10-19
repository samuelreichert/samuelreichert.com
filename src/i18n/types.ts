import type { en } from "./messages/en";

// Keep the English key structure and tuple lengths while allowing translated strings.
type Translated<T> = T extends string
  ? string
  : { readonly [Key in keyof T]: Translated<T[Key]> };
export type Messages = Translated<typeof en>;
