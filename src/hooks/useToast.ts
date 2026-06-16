'use client';

import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState<string[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, message]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0));
    }, 3000);
  }, []);

  return { toasts, showToast };
}
