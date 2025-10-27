import { useRouter } from "@/i18n/routing";
import { authService } from "@/services/auth/auth.service";
import { ButtonPrimary } from "@/shared/components/dump/atoms";
import { useGlobalStore } from "@/shared/store/globalStore";
import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";

const LogoutModal = () => {
  const { isLogout, setIslogout } = useGlobalStore();
  const router = useRouter();
  const t = useTranslations("logoutModal");
  return (
    <Modal
      title={t("title")}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isLogout}
      okType="danger"
      centered
      onCancel={() => setIslogout(false)}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-secondary-blue-color px-6 py-0 !text-white rounded-xl"
            onClick={async () => {
              await authService.clearStorage();
              router.push("/");
              setIslogout(false);
            }}
          >
            {t("okText")}
          </button>
          <Button
            className="!px-6 !py-4 !rounded-xl"
            type="text"
            onClick={() => setIslogout(false)}
          >
            {t("cancelText")}
          </Button>
        </div>
      }
    >
      <p>{t("confirmationMessage")}</p>
    </Modal>
  );
};

export default LogoutModal;
