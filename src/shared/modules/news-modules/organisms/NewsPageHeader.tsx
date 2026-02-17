// components/organisms/NewsPageHeader.tsx

import { Button } from "antd";
import { FaPlus } from "react-icons/fa";

interface NewsPageHeaderProps {
    onAdd: () => void;
}

const NewsPageHeader = ({ onAdd }: NewsPageHeaderProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl !font-bold text-gray-900 mb-2">
                        Yangiliklar
                    </h1>
                    <p className="text-gray-600">
                        Barcha yangiliklar va e'lonlarni boshqaringx
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        type="primary"
                        size="large"
                        icon={<FaPlus />}
                        onClick={onAdd}
                    >
                        Yangi yaratish
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewsPageHeader;