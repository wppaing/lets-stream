import LeftControl from "./leftControls";
import SlideControl from "./slideControl";
import RightControl from "./rightControls";
import LrcView from "./lrcview";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setshowlrc } from "../../features/layout/mainSlice";
import MobileControl from "./mobilecontrol";

export default function Control({ audioRef }) {
  const elRef = useRef();
  const dispatch = useDispatch();
  const { showlrc } = useSelector((state) => state.layout);
  const { currentSong } = useSelector((state) => state.audio);

  useEffect(() => {
    const clickHandler = (event) => {
      if (elRef && elRef.current.contains(event.target)) {
        dispatch(setshowlrc(false));
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [showlrc]);

  return (
    <>
      <div className="hidden md:grid bg-lightGray dark:bg-grayishDark text-grayishDark dark:text-light border-border border-t p-2 px-8 fixed left-0 bottom-0 w-screen text-sm grid-cols-4 z-[1]">
        <LeftControl audioRef={audioRef} />
        <SlideControl audioRef={audioRef} />
        <RightControl audioRef={audioRef} />
        <LrcView />
        <div
          ref={elRef}
          className={`bg-[rgba(0,0,0,0.6)] absolute inset-0 w-screen h-screen -translate-y-full transition-all  duration-700 ease-in-out ${
            showlrc ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        ></div>
      </div>
      {currentSong && <MobileControl audioRef={audioRef} />}
    </>
  );
}
