'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SettingsIndexPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'business', 'users', 'roles', 'notifications', 'security', 'integrations'].includes(tab)) {
      router.replace(`/admin/settings/${tab}`);
    } else {
      router.replace('/admin/settings/profile');
    }
  }, [router, searchParams]);

  return (
    <div className="p-8 text-center text-xs text-slate-400">
      Loading settings...
    </div>
  );
}
