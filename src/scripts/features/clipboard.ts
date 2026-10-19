import { copy } from "../../i18n";
import { currentLocale } from "../browser";

let feedbackTimeout: ReturnType<typeof setTimeout> | undefined;
const feedbackDuration = 3500;

export function resetClipboardFeedback(): void {
  clearTimeout(feedbackTimeout);
  document.querySelector("[data-copy-email]")?.classList.remove("is-copied");
  const feedback = document.querySelector<HTMLElement>("[data-copy-feedback]");
  if (feedback) feedback.textContent = "";
}

async function copyEmail(button: HTMLButtonElement): Promise<void> {
  const email = button.dataset.copyEmail;
  if (!email) return;

  resetClipboardFeedback();
  const feedback = document.querySelector<HTMLElement>("[data-copy-feedback]");
  const messages = copy[currentLocale()];
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(email);
    // A navigation may finish while the browser is handling clipboard permission.
    if (!button.isConnected) return;
    if (feedback) feedback.textContent = messages.copied;
    button.classList.add("is-copied");
  } catch {
    if (!button.isConnected) return;
    if (feedback) feedback.textContent = messages.copyError;
  }
  feedbackTimeout = setTimeout(resetClipboardFeedback, feedbackDuration);
}

export function setupClipboard(): void {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("[data-copy-email]");
    if (button) void copyEmail(button);
  });
}
