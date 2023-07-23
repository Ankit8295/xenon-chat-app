export function SearchIcon() {
  return (
    <svg
      height="18"
      opacity={".9"}
      viewBox="0 0 512 512"
      className="invert cursor-pointer"
    >
      <path
        d="M141.367,116.518c-7.384-7.39-19.364-7.39-26.748,0c-27.416,27.416-40.891,65.608-36.975,104.79
                    c0.977,9.761,9.2,17.037,18.803,17.037c0.631,0,1.267-0.032,1.898-0.095c10.398-1.04,17.983-10.316,16.943-20.707
                    c-2.787-27.845,6.722-54.92,26.079-74.278C148.757,135.882,148.757,123.901,141.367,116.518z"
      />

      <path
        d="M216.276,0C97.021,0,0,97.021,0,216.276s97.021,216.276,216.276,216.276s216.276-97.021,216.276-216.276
                    S335.53,0,216.276,0z M216.276,394.719c-98.396,0-178.443-80.047-178.443-178.443S117.88,37.833,216.276,37.833
                    c98.39,0,178.443,80.047,178.443,178.443S314.672,394.719,216.276,394.719z"
      />

      <path
        d="M506.458,479.71L368.999,342.252c-7.39-7.39-19.358-7.39-26.748,0c-7.39,7.384-7.39,19.364,0,26.748L479.71,506.458
                    c3.695,3.695,8.531,5.542,13.374,5.542c4.843,0,9.679-1.847,13.374-5.542C513.847,499.074,513.847,487.094,506.458,479.71z"
      />
    </svg>
  );
}

type Props = {
  direction?: "left" | "right" | "top" | "bottom";
  styles?: string | string[];
};

export default function ArrowIcon({ direction, styles }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 10"
      fill="none"
      className={` ${direction === "right" && "-rotate-90"} ${
        direction === "top" && "-rotate-180"
      } ${direction === "left" && "rotate-90"}  ${
        typeof styles === "object" ? styles?.join(" ") : styles
      }`}
    >
      <path
        d="M8 9.48828C8.30762 9.47949 8.58887 9.36523 8.81738 9.11914L15.4971 2.28125C15.6904 2.08789 15.7959 1.8418 15.7959 1.55176C15.7959 0.97168 15.3389 0.505859 14.7588 0.505859C14.4775 0.505859 14.2051 0.620117 14.0029 0.822266L8.00879 6.9834L1.99707 0.822266C1.79492 0.628906 1.53125 0.505859 1.24121 0.505859C0.661133 0.505859 0.204102 0.97168 0.204102 1.55176C0.204102 1.8418 0.30957 2.08789 0.50293 2.28125L7.19141 9.11914C7.42871 9.36523 7.69238 9.48828 8 9.48828Z"
        fill="#fff"
      />
    </svg>
  );
}

export function NoIcon() {
  return (
    <svg
      viewBox="0 0 455.111 455.111"
      height="22"
      width="22"
      data-svg-color="noInvert"
      data-svg-opacity="normal"
    >
      <circle fill="red" cx="227.556" cy="227.556" r="227.556" />
      <path
        fill="#FFFFFF"
        d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
      c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
      c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
      c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
      C339.911,308.622,339.911,322.844,331.378,331.378z"
      />
    </svg>
  );
}
