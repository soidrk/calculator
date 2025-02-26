import { useEffect } from 'react';

export default function useUsageTracker(pageName) {
  useEffect(() => {
    fetch('/api/usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'page_view', page: pageName }),
    });
  }, [pageName]);
}
