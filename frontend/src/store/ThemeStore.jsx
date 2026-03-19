import { create } from 'zustand';
import { THEMES } from '../constants';

// zustand store holds theme and setter with side effects
export const useThemeStore = create((set) => {
  const initial = localStorage.getItem('theme') || THEMES[0].name;
  // apply initial theme immediately
  if (initial) {
    document.documentElement.setAttribute('data-theme', initial);
    localStorage.setItem('theme', initial);
  }
  return {
    theme: initial,
    setTheme: (name) => {
      if (name) {
        document.documentElement.setAttribute('data-theme', name);
        localStorage.setItem('theme', name);
      }
      set({ theme: name });
    },
  };
});

