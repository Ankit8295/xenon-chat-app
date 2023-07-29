import Loading from "./Loading";
type Props = {
  loading?: boolean;
  error?: boolean;
  label?: string;
  loadingLabel?: string;
  errorLabel?: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  customStyles?: string;
};
export function AsyncButton({
  loading,
  error,
  label,
  onClick,
  type,
  loadingLabel,
  customStyles,
  errorLabel,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      type={type}
      className={`flex disabled:cursor-not-allowed items-center h-9 w-auto min-w-[100px] justify-center gap-2 bg-black hover:bg-black/80 rounded  text-white py-1 px-3 ${customStyles}`}
    >
      {loading && <Loading />}
      <span className="font-medium whitespace-nowrap">
        {loading ? loadingLabel : error ? errorLabel : label}
      </span>
    </button>
  );
}
