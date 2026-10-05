'use client';
import { createContext, useContext } from 'react';
import { UI } from './data';

export const LangContext = createContext('en');

// Localized view of a data object: its `vi` overrides win when Vietnamese is on
export const loc = (obj, lang) => (lang === 'vi' && obj.vi ? { ...obj, ...obj.vi } : obj);

export function useLang() {
  const lang = useContext(LangContext);
  return { lang, t: UI[lang] };
}

// [text, emphasis] pairs → text with <em> (or the given tag) on emphasised parts
export function Rich({ parts, as: Tag = 'em' }) {
  return parts.map(([text, em], i) => (em ? <Tag key={i}>{text}</Tag> : text));
}
