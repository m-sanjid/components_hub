import { IconHome, IconSettings, IconUser } from "@tabler/icons-react";
import IconHover from "../code/icon-hover";

export default function Example3() {
  const menu = [
    { label: "Home", icon: IconHome },
    { label: "Settings", icon: IconSettings },
    { label: "Profile", icon: IconUser },
  ];

  return (
    <div className="flex gap-8 p-8">
      {menu.map(({ label, icon }) => (
        <div
          key={label}
          className="group/icon flex flex-col items-center gap-2"
        >
          <IconHover icon={icon} />
          <span className="text-muted-foreground group-hover/icon:text-primary text-sm font-medium transition">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
