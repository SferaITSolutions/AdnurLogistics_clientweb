// components/molecules/NewsForm.tsx

import { Input } from "antd";
import ImageUploader from "@/shared/components/dump/ui/image-upload";
import FormField from "../atoms/FormField";

interface NewsFormValues {
  title: string;
  content: string;
  imgUrl: string;
}

interface NewsFormProps {
  values: NewsFormValues;
  onChange: (values: NewsFormValues) => void;
  disabled?: boolean;
  uploaderKey?: number;
  initialImgUrl?: string;
}

const NewsForm = ({
  values,
  onChange,
  disabled = false,
  uploaderKey,
  initialImgUrl,
}: NewsFormProps) => {
  return (
    <div className="space-y-6 pt-2">
      <FormField label="Sarlavha">
        <Input
          size="large"
          placeholder="Yangilik sarlavhasini kiriting..."
          value={values.title}
          onChange={(e) => onChange({ ...values, title: e.target.value })}
          disabled={disabled}
          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </FormField>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FormField label="Tavsif">
            <textarea
              rows={12}
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Yangilik matnini kiriting..."
              value={values.content}
              onChange={(e) => onChange({ ...values, content: e.target.value })}
              disabled={disabled}
            />
          </FormField>
        </div>

        <div>
          <FormField label="Rasm">
            <ImageUploader
              key={uploaderKey}
              onUploadSuccess={(url: string) => onChange({ ...values, imgUrl: url })}
              initialUrl={initialImgUrl}
              uploadPath="news"
              maxSizeMB={5}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default NewsForm;