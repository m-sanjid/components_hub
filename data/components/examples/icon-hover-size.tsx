import { IconSearch } from "@tabler/icons-react";
import IconHover from "../code/icon-hover";

export default function Example4() {
  return (
    <div className="flex gap-6 p-8">
      <div className="group/icon rounded-md border px-4 py-2">
        <IconHover icon={IconSearch} size={10} />
      </div>
      <div className="group/icon rounded-md border px-4 py-2">
        <IconHover icon={IconSearch} size={14} iconClassName="text-red-500" />
      </div>
      <div className="group/icon rounded-md border px-4 py-2">
        <IconHover icon={IconSearch} size={20} iconClassName="stroke-2" />
      </div>
    </div>
  );
}
