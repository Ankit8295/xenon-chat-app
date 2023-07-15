type Props = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

export default function PrimaryButton({
  children,
  type = "button",
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-3 py-1 border  rounded-md hover:bg-black/60"
    >
      {children}
    </button>
  );
}
