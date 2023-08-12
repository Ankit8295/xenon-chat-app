function isIOS(): boolean {
  const userAgent = navigator.userAgent;

  const hasTouchSupport = navigator.maxTouchPoints > 1;

  return (
    (/iPad|iPhone|iPod/.test(userAgent) ||
      (userAgent === "MacIntel" && hasTouchSupport)) &&
    !window.MSStream
  );
}

interface InputEventHandlers {
  onTouchStart: (e: React.TouchEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function getIOSInputEventHandlers(): InputEventHandlers | {} {
  if (isIOS()) {
    return {};
  }

  const nonIOSHandlers: InputEventHandlers = {
    onTouchStart: (e) => {
      e.currentTarget.style.fontSize = "16px";
    },
    onBlur: (e) => {
      e.currentTarget.style.fontSize = "";
    },
  };

  return nonIOSHandlers;
}
