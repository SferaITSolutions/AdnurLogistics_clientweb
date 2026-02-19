import { Form, Radio, Switch } from 'antd';

/**
 * "Og'irlik bo'yicha hisoblanadimi?" Switch field.
 */
const CalculateKgField = () => {
  return (
    <Form.Item
      name="calculateKg"
      label="Hisoblash turi"
      initialValue={true}
    >
      <Radio.Group>
        <Radio value={true}>Og'irlik bo'yicha hisoblash</Radio>
        <Radio value={false}>Hajm bo'yicha hisoblash</Radio>
      </Radio.Group>
    </Form.Item>
  );
};

export default CalculateKgField;