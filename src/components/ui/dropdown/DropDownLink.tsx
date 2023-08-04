import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export default function DropDownLink({ children, onClick }: Props) {
  return (
    <span
      className="px-7 py-3 w-full hover:bg-primary_light dark:hover:bg-primary_dark cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  );
}
