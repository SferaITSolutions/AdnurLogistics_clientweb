'use client';

import { getLocalItem, setLocalItem } from '@/shared/utils/storage';
import { PropsWithChildren, useEffect, useState } from 'react';

import ThemeContext from './ThemeContext';

export default function ThemeState({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<string | null>('default');
  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedFontSize = getLocalItem('fontSize');
      return savedFontSize ? parseInt(savedFontSize, 10) : 16;
    }
    return 16;
  });
  const [originalFontSizes, setOriginalFontSizes] = useState<Map<Element, number>>(new Map());

  const switchTheme = (theme: string | null) => {
    document.body.classList.remove('default', 'dark', 'contrast', 'neon');
    if (theme) document.body.classList.add(theme);
    if (typeof window !== 'undefined' && theme !== null) {
      setLocalItem('theme', theme);
    }
  };

  const applyFontSizeProportionally = (scale: number) => {
    originalFontSizes.forEach((originalSize, element) => {
      (element as HTMLElement).style.fontSize = `${originalSize * scale}px`;
    });
  };

  const updateOriginalFontSizes = () => {
    const elements = document.body.querySelectorAll('*');
    const fontSizeMap = new Map(originalFontSizes); // Сохраняем существующие размеры

    elements.forEach((element) => {
      if (!fontSizeMap.has(element)) {
        // Не обновляем, если уже есть
        const style = window.getComputedStyle(element);
        const currentFontSize = parseFloat(style.fontSize);

        if (!isNaN(currentFontSize)) {
          fontSizeMap.set(element, currentFontSize);
        }
      }
    });

    setOriginalFontSizes(fontSizeMap);
  };

  useEffect(() => {
    updateOriginalFontSizes();

    const observer = new MutationObserver(() => {
      updateOriginalFontSizes();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scale = fontSize / 16;
    applyFontSizeProportionally(scale);
  }, [fontSize]);

  useEffect(() => {
    if (theme) {
      switchTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
