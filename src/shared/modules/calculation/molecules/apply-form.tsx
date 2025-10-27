import React from 'react';
import { Form, Input, InputNumber, Checkbox, Button } from 'antd';
import { useCalculationStore } from '@/entities/hooks/calculation/store';
import { useApplyFormStore } from '../store/store';

type ApplyFormValues = {
  fromLocation: string;
  toLocation: string;
  weight: number;
  bulk: number;
  customs: boolean;
};

export default function ApplyForm() {
  const { values, setValue } = useApplyFormStore();

  const [form] = Form.useForm<ApplyFormValues>();

  const initialValues: ApplyFormValues = {
    fromLocation: values?.from ?? '',
    toLocation: values?.to ?? '',
    weight: values?.weight ?? 0.1,
    bulk: values?.bulk ?? 0.1,
    customs: values?.customs ?? false,
  };

  const onFinish = (values: ApplyFormValues) => {
    setValue('fromLocation', values.fromLocation);
    setValue('toLocation', values.toLocation);
    setValue('weight', values.weight);
    setValue('bulk', values.bulk);
    setValue('customs', values.customs);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="From Location"
        name="from"
        rules={[{ required: true, message: 'Please input the starting location!' }]}
      >
        <Input placeholder={'Enter starting location'} />
      </Form.Item>
      <Form.Item
        label="To Location"
        name="to"
        rules={[{ required: true, message: 'Please input the destination location!' }]}
      >
        <Input placeholder={'Enter destination location'} />
      </Form.Item>
      <Form.Item
        label="Weight (kg)"
        name="kg"
        rules={[
          { required: true, message: 'Please input weight!' },
          { type: 'number', min: 0.001, message: 'Weight must be greater than 0' }
        ]}
      >
        <InputNumber placeholder={'Enter weight in kg'} min={0.001} step={0.01} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Bulk (m³)"
        name="bulk"
        rules={[
          { required: true, message: 'Please input bulk!' },
          { type: 'number', min: 0.001, message: 'Bulk must be greater than 0' }
        ]}
      >
        <InputNumber placeholder={'Enter volume in m³'} min={0.001} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="customs"
        valuePropName="checked"
        style={{ marginBottom: 16 }}
      >
        <Checkbox>Customs Required</Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}
