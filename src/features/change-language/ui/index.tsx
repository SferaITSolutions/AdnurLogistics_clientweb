'use client';

import { getLocalItem, setLocalItem } from '@/shared/utils/storage';

import { LANGUAGES } from '@/shared/constants';
import { Select } from 'antd';
import { usePathname } from '@/i18n/routing';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split('/').filter(Boolean); // removes empty strings
  const handleChange = (value: string) => {
    setLocalItem('lang', value);
    let newPath = '';
    if (pathParts.length > 0) {
      newPath += `/${value}${pathname}`;
    } else newPath += '/' + value;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={getLocalItem('lang') || 'uz'}
        onChange={handleChange}
        style={{ width: 120 }}
        options={LANGUAGES.map((lang: { code: string; label: string }) => ({
          value: lang.code,
          label: lang.label,
        }))}
      />
    </div>
  );
}
