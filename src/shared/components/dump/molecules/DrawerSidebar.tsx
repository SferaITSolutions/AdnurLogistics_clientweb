import { Drawer } from "antd";
import Logo from "@/shared/components/dump/atoms/Logo";
import MenuItem from "./menu-item";
import { FaCalculator, FaHome } from "react-icons/fa";

export const DrawerSidebar = ({
  closeSidebar,
  isOpen,
}: {
  closeSidebar: () => void;
  isOpen: boolean;
}) => {
  return (
    <Drawer
      placement="left"
      onClose={closeSidebar}
      open={isOpen}
      width={300}
      className="md:hidden bg-secondary-blue-color"
      bodyStyle={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      headerStyle={{ display: "none" }}
    >
      <div className="flex flex-col h-full text-white">
        <Logo />
        <nav className="flex flex-col gap-3 mt-10">
          <MenuItem
            label="Dashboard"
            path="/client/dashboard"
            icon={<FaHome color="white" />}
          />
          <MenuItem
            label="Calculation"
            path="/client/calculation"
            icon={<FaCalculator color="white" />}
          />
        </nav>
      </div>
    </Drawer>
  );
};
