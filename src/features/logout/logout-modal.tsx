import { useRouter } from '@/i18n/routing';
import { authService } from '@/services/auth/auth.service';
import { useGlobalStore } from '@/shared/store/globalStore';
import { Modal } from 'antd';

const LogoutModal = () => {
  const { isLogout, setIslogout } = useGlobalStore();
  const router = useRouter();
  return (
    <Modal
      title="Tizimdan chiqish"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isLogout}
      okType="danger"
      onOk={() => {
        authService.clearStorage();
        router.push('/');
      }}
      onCancel={() => setIslogout(false)}
    >
      <p>Tizimdan chiqishni tasdiqlaysizmi?</p>
    </Modal>
  );
};

export default LogoutModal;
