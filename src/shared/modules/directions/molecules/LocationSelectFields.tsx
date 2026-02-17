import { Form, Select, Spin } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

const { Option } = Select;

interface Location {
  id: string;
  name: string;
}

interface LocationSelectFieldsProps {
  fromData?: { result?: Location[] } | any;
  toData?: { result?: Location[] } | any;
  fromLoading: boolean;
  toLoading: boolean;
  fromLabel: string;
  toLabel: string;
  fromPlaceholder: string;
  toPlaceholder: string;
  noLocationsFound?: string;
  /** grid ichida yonma-yon ko'rsatish uchun */
  layout?: "grid" | "stack";
}

/**
 * "Qayerdan" va "Qayerga" Select maydonlari.
 * CreateDirectionModal va EditDirectionModal da ishlatiladi.
 */
const LocationSelectFields = ({
  fromData,
  toData,
  fromLoading,
  toLoading,
  fromLabel,
  toLabel,
  fromPlaceholder,
  toPlaceholder,
  noLocationsFound = "Topilmadi",
  layout = "grid",
}: LocationSelectFieldsProps) => {
  const wrapper =
    layout === "grid"
      ? "grid grid-cols-2 gap-4"
      : "flex flex-col gap-4";

  return (
    <div className={wrapper}>
      {/* From Location */}
      <Form.Item
        label={
          <span className="flex items-center gap-2 font-medium">
            <FaMapMarkerAlt className="text-blue-600" />
            {fromLabel}
          </span>
        }
        name="from"
        rules={[{ required: true, message: fromPlaceholder }]}
      >
        <Select
          placeholder={fromPlaceholder}
          size="large"
          showSearch
          optionFilterProp="children"
          loading={fromLoading}
          filterOption={(input, option) =>
            String(option?.children ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          notFoundContent={fromLoading ? <Spin size="small" /> : noLocationsFound}
        >
          {fromData?.result?.map((loc: {
            id: string;
            name: string;
          }) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* To Location */}
      <Form.Item
        label={
          <span className="flex items-center gap-2 font-medium">
            <FaMapMarkerAlt className="text-red-600" />
            {toLabel}
          </span>
        }
        name="to"
        rules={[{ required: true, message: toPlaceholder }]}
      >
        <Select
          placeholder={toPlaceholder}
          size="large"
          showSearch
          optionFilterProp="children"
          loading={toLoading}
          filterOption={(input, option) =>
            String(option?.children ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          notFoundContent={toLoading ? <Spin size="small" /> : noLocationsFound}
        >
          {toData?.result?.map((loc: {
            id: string;
            name: string;
          }) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default LocationSelectFields;