import { createRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatDuration } from "../../utils/util";
import styled from "styled-components";

export default function ProgressBar({ audioRef, height, showStamp }) {
  const elRef = createRef();
  const audioInfo = useSelector((state) => state.audio);
  const [showThumb, setShowThumb] = useState(false);
  const [showtooltip, setShowtooltip] = useState(false);
  const [spanpos, setSpanPos] = useState(0);
  const thumbLeft = (audioInfo.currenttime / audioInfo.duration) * 100;

  const skipHandler = (e) => {
    const pos =
      (e.pageX - elRef.current.offsetLeft) / elRef.current.offsetWidth;
    audioRef.current.currentTime = pos * audioInfo.duration;
  };

  const hoverHandler = (e) => {
    setShowtooltip(true);
    setShowThumb(true);
    setSpanPos(e.pageX);
    // const pos =
    //   (e.pageX - elRef.current.offsetLeft) / elRef.current.offsetWidth;
    // // setSpanPos(pos * 100);
  };

  const mouseLeave = () => {
    setShowtooltip(false);
    setShowThumb(false);
  };

  return (
    <div
      ref={elRef}
      style={{ height: `${height}` }}
      className={`relative hover:cursor-pointer`}
      onClick={skipHandler}
      onMouseOver={hoverHandler}
      onMouseLeave={mouseLeave}
    >
      <div className="absolute top-1/2 -translate-y-1/2 bg-[#dddddd] dark:bg-[#ffffff1a] w-full h-0.5"></div>
      <div
        style={{ width: `${thumbLeft}%` }}
        className={"absolute bg-accent h-0.5 top-1/2 -translate-y-1/2"}
      ></div>
      {showThumb && (
        <div
          style={{ left: `${thumbLeft}%` }}
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-light border border-[#929292]`}
        ></div>
      )}
      {showStamp && (
        <>
          {showtooltip && (
            <Tooltip
              style={{ left: `${spanpos}px` }}
              className={`fixed -translate-x-1/2 translate-y-[-110%] px-1.5 py-1 rounded-sm text-grayishDark bg-light`}
            >
              {/* {formatDuration(spanpos)} */}
              12:22
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
}

const Tooltip = styled.span`
  transition: 0.1s ease;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
    border: 4px solid transparent;
    border-top-color: #f7f8f9;
  }
`;
