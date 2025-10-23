import { useGlobalStore } from '@/shared/store/globalStore';
import { Select } from 'antd';

const SelectBefore = ({ className }: { className?: string }) => {
  const { beforePhone, setBeforePhone } = useGlobalStore();
  return (
    <Select
      className={className}
      value={beforePhone}
      onChange={(e) => setBeforePhone(e)}
      options={[
        { value: '+998', label: '+998' },
        { value: '+90', label: '+90' },
      ]}
    />
  );
};

export default SelectBefore;
