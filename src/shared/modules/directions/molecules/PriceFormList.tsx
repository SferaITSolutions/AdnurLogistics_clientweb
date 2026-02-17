import React, { useRef, useEffect, useState } from "react";
import { Form, Divider } from "antd";
import { FaWeight } from "react-icons/fa";
import PriceItemCard from "./PriceItemCard";

interface PriceFormListProps {
  form: any;
  title?: string;
}

const DEFAULT_PRICE_ITEM = {
  minWeight: null,
  maxWeight: undefined,
  cub3: null,
  overPrice: false,
};

/**
 * Form.List wrapper — narxlar ro'yxatini ko'rsatadi.
 * Yangi element qo'shilganda avtomatik scroll pastga tushadi.
 * CreateDirectionModal va AddDeliveryPricesModal da ishlatiladi.
 */
const PriceFormList: React.FC<PriceFormListProps> = ({ form, title }) => {
  const [listLength, setListLength] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Yangi element qo'shilganda scroll pastga
  useEffect(() => {
    if (listLength > 0 && containerRef.current) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
    }
  }, [listLength]);

  return (
    <>
      {title && (
        <Divider orientation="left" className="!mt-6 !mb-4">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <FaWeight className="text-blue-500" />
            {title}
          </span>
        </Divider>
      )}

      <Form.List name="priceList">
        {(fields, { add, remove }) => {
          if (fields.length !== listLength) {
            setListLength(fields.length);
          }

          return (
            <div
              ref={containerRef}
              className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 mb-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {fields.map((field, index) => (
                <PriceItemCard
                  key={field.key}
                  name={field.name}
                  index={index}
                  restField={field}
                  fieldsLength={fields.length}
                  onRemove={() => remove(field.name)}
                  onAdd={() => add({ ...DEFAULT_PRICE_ITEM })}
                  form={form}
                  isLast={index === fields.length - 1}
                />
              ))}
            </div>
          );
        }}
      </Form.List>
    </>
  );
};

export default PriceFormList;