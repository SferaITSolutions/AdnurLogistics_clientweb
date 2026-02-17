import { InputNumber, Switch } from "antd";

interface EditForm {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

type SetEditForm = (form: EditForm) => void;

/**
 * Inline edit holatida ko'rsatiladigan input celllar.
 * ViewDirectionPricesModal columnlarida ishlatiladi.
 */

export const renderMinWeight = (
  value: number,
  isEditing: boolean,
  editForm: EditForm,
  setEditForm: SetEditForm
) => {
  if (isEditing) {
    return (
      <InputNumber
        min={0.1}
        step={0.1}
        value={editForm.minWeight}
        onChange={(val) => setEditForm({ ...editForm, minWeight: val as number })}
        disabled={editForm.overPrice}
        className="w-full"
      />
    );
  }
  return <span className="font-medium">{value} kg</span>;
};

export const renderMaxWeight = (
  value: number,
  isEditing: boolean,
  editForm: EditForm,
  setEditForm: SetEditForm
) => {
  if (isEditing) {
    return (
      <InputNumber
        min={0.1}
        step={0.1}
        value={editForm.maxWeight}
        onChange={(val) => setEditForm({ ...editForm, maxWeight: val as number })}
        disabled={editForm.overPrice}
        placeholder="Cheksiz"
        className="w-full"
      />
    );
  }
  return <span className="font-medium">{value ? `${value} kg` : "Cheksiz"}</span>;
};

export const renderCub3 = (
  value: number,
  isEditing: boolean,
  editForm: EditForm,
  setEditForm: SetEditForm
) => {
  if (isEditing) {
    return (
      <InputNumber
        min={0}
        step={1000}
        value={editForm.cub3}
        onChange={(val) => setEditForm({ ...editForm, cub3: val as number })}
        formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        parser={(val: any) => val!.replace(/\s?/g, "")}
        className="w-full"
      />
    );
  }
  return (
    <span className="font-semibold text-green-600">
      {value.toLocaleString()} $
    </span>
  );
};

export const renderOverPrice = (
  value: boolean,
  isEditing: boolean,
  editForm: EditForm,
  setEditForm: SetEditForm
) => {
  if (isEditing) {
    return (
      <Switch
        checked={editForm.overPrice}
        onChange={(checked) => {
          setEditForm({
            ...editForm,
            overPrice: checked,
            minWeight: checked ? 1000 : 0.1,
            maxWeight: checked ? undefined : editForm.maxWeight,
          });
        }}
      />
    );
  }
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"
      }`}
    >
      {value ? "Ha" : "Yo'q"}
    </span>
  );
};