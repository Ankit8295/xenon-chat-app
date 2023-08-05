import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  active?: boolean;
  openTo: "left" | "right";
  styles?: string;
};
export function DropDownWrapper({ children, active, openTo, styles }: Props) {
  return (
    <div
      className={`${
        active
          ? `absolute z-50 transition-all duration-300 overflow-hidden ${
              openTo === "right" ? " right-5" : "left-5"
            } whitespace-nowrap  top-[110%] flex flex-col text-xs bg-hover_light dark:bg-hover_dark rounded-md`
          : "hidden"
      } ${styles} `}
    >
      {children}
    </div>
  );
}
