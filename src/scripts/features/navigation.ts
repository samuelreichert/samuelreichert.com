import { copy } from "../../i18n";
import { currentLocale } from "../browser";

function setMenu(open: boolean, returnFocus = false): void {
  const button = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const messages = copy[currentLocale()];
  document.querySelector(".nav")?.classList.toggle("is-open", open);
  button?.setAttribute("aria-expanded", String(open));
  button?.setAttribute("aria-label", open ? messages.closeMenu : messages.menu);
  if (returnFocus) button?.focus();
}

export function syncNavigation(): void {
  setMenu(false);
  const pathname = location.pathname.replace(/\/$/, "");
  document.querySelectorAll<HTMLAnchorElement>(".nav a").forEach((link) => {
    if (link.pathname === pathname) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

export function setupNavigation(): void {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>(".nav-toggle");
    if (button) {
      setMenu(button.getAttribute("aria-expanded") !== "true");
    } else if (
      event.target.closest(".nav a") ||
      !event.target.closest(".site-header")
    ) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector(".nav.is-open"))
      setMenu(false, true);
  });

  document.addEventListener("focusin", (event) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".site-header")
    )
      setMenu(false);
  });

  window
    .matchMedia("(min-width: 900px)")
    .addEventListener("change", () => setMenu(false));
}
