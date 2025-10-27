'use client';

import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowUp, FaSpinner } from 'react-icons/fa';

import { useCreatePetition } from '@/entities/hooks/calculation/hooks';
import { formatNumber } from '@/shared/utils/formatter';
import { useTranslations } from 'next-intl';
import { useFormStore } from '../../store/store';

export default function ResultCalculation({ response }: { response: any }) {
  const { values } = useFormStore();
  const t = useTranslations('calculationResult');
  const createPetitionMutation = useCreatePetition();

  // Modal state for petition success
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePetition = () => {
    createPetitionMutation.mutate({
      fromLocation: values.from,
      toLocation: 'TASHKENT',
      weight: values.kg,
      bulk: values.m3,
      containerType: values.containerType,
      customs: values.customsPriceCalculation,
      price: Number(response?.result),
    });
  };

  useEffect(() => {
    if (createPetitionMutation.isSuccess) {
      setIsModalOpen(true);
    }
  }, [createPetitionMutation.isSuccess]);

  const handleModalOk = () => {
    setIsModalOpen(false);
    createPetitionMutation.reset();
  };

  if (createPetitionMutation.isPending) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center bg-black/70 justify-center !z-50">
        <FaSpinner color="white" size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Modal
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        centered
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            {t('modalButtonOk')}
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-3 items-center">
          <span className="text-lg font-semibold">{t('modalTitleSuccess')}</span>
          <span>{t('modalMessageSuccess')}</span>
        </div>
      </Modal>
      {response ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{t('calculatedPriceTitle')} </h1>
            <p className="text-xl font-bold">
              ${formatNumber(response?.result) || 0} {t('priceSuffix')}
            </p>
          </div>
          <p>{t('disclaimer')}</p>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !py-5 !rounded-xl"
            onClick={handleCreatePetition}
            disabled={createPetitionMutation.isPending}
          >
            {t('sendRequestButton')}
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[260px] rounded-lg gap-4 px-4 py-10">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 mb-3">
              <FaArrowLeft size={32} className="text-primary/60 lg:block hidden" />
              <FaArrowUp size={32} className="text-primary/60 lg:hidden block" />
            </div>
            <span className="text-xl !font-semibold text-primary text-center">
              {t('errorNeedCalculationTitle')}
            </span>
          </div>
          <p className="text-lg text-center text-gray-600">{t('errorNeedCalculationMessage')}</p>
        </div>
      )}
    </div>
  );
}
