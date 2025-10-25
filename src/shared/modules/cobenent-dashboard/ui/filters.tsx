import { FilterPersonalNumber, TabFilter } from '../molecules';

export default function Filters() {
  return (
    <div className="flex flex-col gap-4">
      <FilterPersonalNumber />
      <TabFilter />
    </div>
  );
}
