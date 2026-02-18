import { Form, Switch } from 'antd';

/**
 * "Og'irlik bo'yicha hisoblanadimi?" Switch field.
 */
const CalculateKgField = () => {
  return (
    <Form.Item
      name="calculateKg"
      label="Og'irlik bo'yicha hisoblanadimi?"
      valuePropName="checked"
    >
      <Switch checkedChildren="Ha" unCheckedChildren="Yo'q" />
    </Form.Item>
  );
};

export default CalculateKgField;