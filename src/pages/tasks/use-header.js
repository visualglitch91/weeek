import React, { useState } from "react";
import { clamp } from "../../utils";
import useAnimationFrame from "../../hooks/use-animation-frame";

const maxHeight = 120;
const minHeight = 60;
const heightSpeed = 0.5;

const maxFontSize = 38;
const minFontSize = 24;
const fontSizeSpeed = 0.1;

function Header({ ionContentRef }) {
  const [scrollTop, setScrollTop] = useState(0);

  useAnimationFrame(async () => {
    if (!ionContentRef.current) {
      return;
    }

    const ionContentScroll = await ionContentRef.current.getScrollElement();

    if (ionContentScroll.scrollHeight - ionContentScroll.offsetHeight > 100) {
      setScrollTop(ionContentScroll.scrollTop);
    }
  });

  return (
    <div
      style={{
        height: clamp(
          maxHeight - scrollTop * heightSpeed,
          minHeight,
          maxHeight
        ),
        background:
          "linear-gradient(0deg, rgb(200, 240, 244), rgb(240, 187, 234))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h1
        style={{
          margin: "0 0 0 -16px",
          fontFamily: "Pacifico",
          fontSize: clamp(
            maxFontSize - scrollTop * fontSizeSpeed,
            minFontSize,
            maxFontSize
          )
        }}
      >
        Weeek
      </h1>
    </div>
  );
}

function useHeader(props) {
  const ionContentRef = React.useRef();
  const element = <Header {...props} ionContentRef={ionContentRef} />;

  return [ionContentRef, element];
}

export default useHeader;
