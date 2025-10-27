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
      centered
      cancelText="Yo'q"
      okText="Ha"
      onOk={async () => {
        await authService.clearStorage();
        router.push('/');
        setIslogout(false);
      }}
      onCancel={() => setIslogout(false)}
    >
      <p>Tizimdan chiqishni tasdiqlaysizmi?</p>
    </Modal>
  );
};

export default LogoutModal;
