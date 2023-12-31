type Props = {
  direction?: "left" | "right" | "top" | "bottom";
  styles?: string | string[];
  width?: string;
  height?: string;
};

export default function ArrowIcon({
  direction,
  styles,
  height = "19",
  width = "19",
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 10"
      fill="none"
      className={` ${direction === "right" && "-rotate-90"} ${
        direction === "top" && "-rotate-180"
      } ${direction === "left" && "rotate-90"}  ${
        typeof styles === "object" ? styles?.join(" ") : styles
      } invert dark:invert-0`}
    >
      <path
        d="M8 9.48828C8.30762 9.47949 8.58887 9.36523 8.81738 9.11914L15.4971 2.28125C15.6904 2.08789 15.7959 1.8418 15.7959 1.55176C15.7959 0.97168 15.3389 0.505859 14.7588 0.505859C14.4775 0.505859 14.2051 0.620117 14.0029 0.822266L8.00879 6.9834L1.99707 0.822266C1.79492 0.628906 1.53125 0.505859 1.24121 0.505859C0.661133 0.505859 0.204102 0.97168 0.204102 1.55176C0.204102 1.8418 0.30957 2.08789 0.50293 2.28125L7.19141 9.11914C7.42871 9.36523 7.69238 9.48828 8 9.48828Z"
        fill="#fff"
      />
    </svg>
  );
}

export function SendMessageIcon({ direction }: Props) {
  return (
    <svg
      height="20"
      viewBox="0 0 512 512"
      width="20"
      className={`max-lg:-rotate-90 invert dark:invert-0`}
    >
      <path
        id="PaperPlane"
        d="m51.7 29.2c-38.8 0-63.8 41.3-45.7 75.7l66.2 125.6 222.1 25.5-222.1 25.6-66.2 125.6c-18.1 34.4 6.8 75.7 45.7 75.7 7 0 14-1.4 20.5-4.2l409.8-177c40-17.3 40-74 0-91.3l-409.8-177c-6.5-2.8-13.5-4.2-20.5-4.2z"
        fill="rgb(255, 255, 255)"
      />
    </svg>
  );
}

export function EmojiIcon() {
  return (
    <svg
      width={23}
      height={23}
      viewBox="0 0 295.996 295.996"
      className="invert-0 dark:invert opacity-75 hover:opacity-100 cursor-pointer  transition-opacity duration-300"
      fill="#2d3142"
    >
      <path
        d="M147.998,0C66.392,0,0,66.392,0,147.998s66.392,147.998,147.998,147.998s147.998-66.392,147.998-147.998
     S229.605,0,147.998,0z M147.998,279.996c-36.256,0-69.143-14.696-93.022-38.44c-9.536-9.482-17.631-20.41-23.934-32.42
     C21.442,190.847,16,170.047,16,147.998C16,75.214,75.214,16,147.998,16c34.523,0,65.987,13.328,89.533,35.102
     c12.208,11.288,22.289,24.844,29.558,39.996c8.27,17.239,12.907,36.538,12.907,56.9
     C279.996,220.782,220.782,279.996,147.998,279.996z"
      />
      <circle cx="99.666" cy="114.998" r="16" />
      <circle cx="198.666" cy="114.998" r="16" />
      <path
        d="M147.715,229.995c30.954,0,60.619-15.83,77.604-42.113l-13.439-8.684c-15.597,24.135-44.126,37.604-72.693,34.308
     c-22.262-2.567-42.849-15.393-55.072-34.308l-13.438,8.684c14.79,22.889,39.716,38.409,66.676,41.519
     C140.814,229.8,144.27,229.995,147.715,229.995z"
      />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      height="20"
      width="20"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
      ></path>
    </svg>
  );
}

export function SaveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      height="20"
      width="20"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"
      ></path>
    </svg>
  );
}
