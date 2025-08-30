import { IconBrandGithub, IconBrandX, IconBrandLinkedin } from "@tabler/icons-react";
import IconHover from "../code/icon-hover";

export default function Example5() {
  return (
    <div className="flex gap-6 p-8 justify-center">
      <a href="https://github.com" target="_blank" className="group/icon">
        <IconHover icon={IconBrandGithub} />
      </a>
      <a href="https://twitter.com" target="_blank" className="group/icon">
        <IconHover icon={IconBrandX} />
      </a>
      <a href="https://linkedin.com" target="_blank" className="group/icon">
        <IconHover icon={IconBrandLinkedin} />
      </a>
    </div>
  );
}
