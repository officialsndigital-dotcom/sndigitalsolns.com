"use client";

import { useSyncExternalStore } from "react";
import { type Categories, DENY_ALL, fromCookieString, toCookieString } from "@/lib/consent";

/**
 * The visitor's choice, shared between the banner that asks for it and the
 * scripts that depend on it. A plain module store rather than a context
 * because both live in the root layout as siblings, and the analytics tags
 * must be able to read it without being wrapped in anything.
 */

type State = { decided: boolean; categories: Categories; panelOpen: boolean };

let state: State = { decided: false, categories: DENY_ALL, panelOpen: false };
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function set(next: Partial<State>) {
  state = { ...state, ...next };
  emit();
}

function subscribe(listener: () => void) {
  // The cookie can only be read in the browser, so the first subscriber is
  // also what moves us off the server's "nothing decided" snapshot.
  if (!hydrated) {
    hydrated = true;
    const stored = fromCookieString(document.cookie);
    if (stored) state = { ...state, decided: true, categories: stored };
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const serverState: State = { decided: false, categories: DENY_ALL, panelOpen: false };

export function useConsent(): State {
  return useSyncExternalStore(subscribe, () => state, () => serverState);
}

export function saveConsent(categories: Categories) {
  document.cookie = toCookieString(categories, location.protocol === "https:");
  set({ decided: true, categories, panelOpen: false });
}

export function openPreferences() {
  set({ panelOpen: true });
}

export function closePreferences() {
  set({ panelOpen: false });
}
