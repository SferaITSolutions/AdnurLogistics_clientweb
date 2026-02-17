import { Button, Col, Form, Input, InputNumber, Radio, Row, Select } from 'antd';
import { useRegions, useToRegions } from '@/shared/constants';

import { useFormRequestStore } from '../lib/store';

const { Option } = Select;

export default function FormRequest() {
  const [form] = Form.useForm();
  const { setValue, resetForm } = useFormRequestStore();
  const { TO_OPTIONS } = useToRegions();
  const { FROM_OPTIONS } = useRegions();

  // Custom validations: e.g. from and to can't be the same
  const validateFromTo = async (_: any, value: any) => {
    const to = form.getFieldValue('to');
    if (value && to && value === to) {
      return Promise.reject('Qayerdan va qayerga bir xil bo‘lishi mumkin emas');
    }
    return Promise.resolve();
  };

  const validateTo = async (_: any, value: any) => {
    const from = form.getFieldValue('from');
    if (value && from && value === from) {
      return Promise.reject('Qayerdan va qayerga bir xil bo‘lishi mumkin emas');
    }
    return Promise.resolve();
  };

  // Phone validation
  const phoneRegex = /^(?:\+998\s?)?\d{2}\s?\d{3}-?\d{2}-?\d{2}$/;

  const handleFinish = (values: any) => {
    setValue('fullName', values.fullName);
    setValue('phone', values.phone);
    setValue('uniqueNumber', values.uniqueNumber);
    setValue('from', values.from);
    setValue('to', values.to);
    setValue('weight', values.weight);
    setValue('m3', values.m3);
    setValue('density', values.density);
    setValue('estimatedPrice', values.estimatedPrice);
    setValue('orderType', values.orderType);
    // console.log(values);
    resetForm();
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish} className="w-full">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Ism familiya"
              rules={[
                { required: true, message: 'Ism va familiyangizni kiriting' },
                {
                  min: 2,
                  message: 'Ism va familiya kamida 2 ta belgidan iborat bo‘lishi kerak',
                },
              ]}
            >
              <Input placeholder="Ism familiya" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Telefon raqam"
              rules={[
                { required: true, message: 'Telefon raqam kiriting' },
                {
                  pattern: phoneRegex,
                  message:
                    'To‘g‘ri telefon raqam kiriting. Masalan: +998 90 123-45-67 yoki 901234567',
                },
              ]}
            >
              <Input placeholder="+998 xx xxx-xx-xx" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="uniqueNumber"
              label="Unique number"
              rules={[
                { required: true, message: 'Unique number kiriting' },
                {
                  min: 4,
                  message: 'Unique number kamida 4 ta belgidan iborat bo‘lishi kerak',
                },
              ]}
            >
              <Input placeholder="Unique number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="from"
              label="Qayerdan"
              rules={[
                { required: true, message: 'Manzilni tanlang' },
                { validator: validateFromTo },
              ]}
            >
              <Select placeholder="Qayerdan tanlang">
                {FROM_OPTIONS.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="to"
              label="Qayerga"
              rules={[
                { required: true, message: 'Boriladigan manzilni tanlang' },
                { validator: validateTo },
              ]}
            >
              <Select placeholder="Qayerga tanlang">
                {TO_OPTIONS.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="weight"
              label="Og‘irligi (kg)"
              rules={[
                { required: true, message: "Og'irlikni kiriting" },
                {
                  type: 'number',
                  min: 0.01,
                  message: 'Qiymat 0 dan katta bo‘lishi kerak',
                },
                {
                  type: 'number',
                  max: 1000000,
                  message: 'Juda katta og‘irlik kiritildi',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0.01}
                step={0.01}
                placeholder="Og‘irligi (kg)"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="m3"
              label="m³"
              rules={[
                { required: true, message: 'Hajmni m³ da kiriting' },
                {
                  type: 'number',
                  min: 0.01,
                  message: 'Qiymat 0 dan katta bo‘lishi kerak',
                },
                {
                  type: 'number',
                  max: 5000,
                  message: 'Juda katta hajm kiritildi',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0.01}
                step={0.01}
                placeholder="Hajm (m³)"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="density"
              label="Zichligi (kg/m³)"
              rules={[
                { required: true, message: 'Zichlikni kiriting' },
                {
                  type: 'number',
                  min: 0.01,
                  message: 'Qiymat 0 dan katta bo‘lishi kerak',
                },
                {
                  type: 'number',
                  max: 20000,
                  message: "Zichlik juda katta bo'lishi mumkin emas",
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0.01}
                step={0.01}
                placeholder="Zichligi (kg/m³)"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="estimatedPrice"
              label="Taxminiy hisoblangan narxi (so'm)"
              rules={[
                { required: true, message: 'Hisoblangan narxni kiriting' },
                {
                  type: 'number',
                  min: 0,
                  message: 'Qiymat 0 dan katta yoki teng bo‘lishi kerak',
                },
                {
                  type: 'number',
                  max: 1000000000,
                  message: 'Juda katta narx kiritildi',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                placeholder="Taxminiy hisoblangan narxi (so'm)"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="orderType"
              label="Buyurtma turi"
              rules={[
                { required: true, message: 'Buyurtma turini tanlang' },
                {
                  validator: (_, value) =>
                    value === 'FCL' || value === 'ICL'
                      ? Promise.resolve()
                      : Promise.reject('Noto‘g‘ri buyurtma turi tanlandi'),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="FCL">FCL (To'liq konteyner)</Radio>
                <Radio value="ICL">ICL (Qisman konteyner)</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Yuborish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
