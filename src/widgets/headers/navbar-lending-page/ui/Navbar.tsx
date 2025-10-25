'use client';

import { ButtonPrimary } from '@/shared/components/dump/atoms/button';
import { FaArrowRight } from 'react-icons/fa';
import LanguageSwitcher from '@/features/change-language/ui';
import { Logo } from '../atoms/Logo';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export const Navbar = () => {
  const navigate = useRouter();
  const t = useTranslations('LendingPage.header');
  return (
    <header className="fixed  flex justify-between items-center  top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className=" flex justify-between items-center  container mx-auto w-full">
        <Logo />

        {/* Desktop nav links */}
        <div className="flex items-center gap-6 justify-center">
          <LanguageSwitcher />
          <ButtonPrimary
            type="primary"
            label={t('login')}
            Icon={<FaArrowRight />}
            onClick={() => {
              navigate.push('/auth/log-in');
            }}
          />
        </div>
      </nav>
    </header>
  );
};
