import { en } from "./messages/en";
import { pt } from "./messages/pt";
export * from "./config";
export type { Messages } from "./types";
export const copy = { en, pt } as const;
