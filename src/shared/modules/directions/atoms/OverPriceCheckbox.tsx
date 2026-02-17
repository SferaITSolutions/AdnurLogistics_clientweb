// components/atoms/OverPriceCheckbox.tsx

import { Checkbox, Form } from "antd";

interface OverPriceCheckboxProps {
  name: number;
  restField: any;
  form: any;
}

/**
 * "1000 kg dan yuqori" checkbox.
 * Belgilanganda minWeight = 1000, maxWeight = undefined qilib qo'yadi.
 */
const OverPriceCheckbox = ({ name, restField, form }: OverPriceCheckboxProps) => {
  return (
    <Form.Item
      {...restField}
      name={[name, "overPrice"]}
      valuePropName="checked"
      className="mb-4"
    >
      <Checkbox
        className="text-base font-medium"
        onChange={(e) => {
          if (e.target.checked) {
            form.setFieldValue(["priceList", name, "minWeight"], 1000);
            form.setFieldValue(["priceList", name, "maxWeight"], undefined);
          } else {
            form.setFieldValue(["priceList", name, "minWeight"], null);
          }
        }}
      >
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
          🚀 1000 kg dan yuqori
        </span>
      </Checkbox>
    </Form.Item>
  );
};

export default OverPriceCheckbox;