import { Button, Modal } from 'antd';

import { authService } from '@/services/auth/auth.service';
import { useGlobalStore } from '@/shared/store/globalStore';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const LogoutModal = () => {
  const { isLogout, setIslogout } = useGlobalStore();
  const router = useRouter();
  const t = useTranslations('logoutModal');
  return (
    <Modal
      title={t('title')}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isLogout}
      okType="danger"
      centered
      onCancel={() => setIslogout(false)}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="!px-6 !py-4 !rounded-xl"
            type=""

            onClick={() => setIslogout(false)}
          >
            {t('cancelText')}
          </Button>
          <button
            type="button"
            className="bg-secondary-blue-color cursor-pointer px-6 py-0 !text-white rounded-xl"
            onClick={async () => {
              await authService.clearStorage();
              router.push('/');
              setIslogout(false);
            }}
          >
            {t('okText')}
          </button>
        </div>
      }
    >
      <p>{t('confirmationMessage')}</p>
    </Modal>
  );
};

export default LogoutModal;
