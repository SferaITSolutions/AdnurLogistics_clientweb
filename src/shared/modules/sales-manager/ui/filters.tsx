import { FilterPersonalNumber, TabFilter } from '../molecules';

export default function SalesOrderFilters() {
  return (
    <div className="flex flex-col gap-4">
      <FilterPersonalNumber />
      <TabFilter />
    </div>
  );
}
