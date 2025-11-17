import { useGlobalStore } from "@/shared/store/globalStore";
import { Select } from "antd";
import Image from "next/image";
import UzbekistanFlag from "@/assets/images/landing-images/uzb.png";
import TurkeyFlag from "@/assets/images/landing-images/turkey.png";

const SelectBefore = ({ className }: { className?: string }) => {
  const { beforePhone, setBeforePhone } = useGlobalStore();

  const options = [
    {
      value: "+998",
      label: (
        <div className="flex items-center gap-2">
          <Image
            src={UzbekistanFlag}
            alt="Uzbekistan"
            width={18}
            className="rounded-sm"
          />
          <span>+998</span>
        </div>
      ),
    },
    {
      value: "+90",
      label: (
        <div className="flex items-center gap-2">
          <Image
            src={TurkeyFlag}
            alt="Turkey"
            width={18}
            className="rounded-sm"
          />
          <span>+90</span>
        </div>
      ),
    },
  ];

  return (
    <Select
      className={className + " min-w-[100px]"}
      value={beforePhone}
      onChange={(e) => setBeforePhone(e)}
      options={options}
      optionLabelProp="label"
    />
  );
};

export default SelectBefore;
