import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faCirclePause,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setcurrentindex, setisplaying } from "../../features/audio/audioSlice";

export default function MainControl({ audioRef }) {
  const dispatch = useDispatch();
  const { isPlaying, currentSong, currentIndex, currentData } = useSelector(
    (state) => state.audio
  );

  const playHandler = () => {
    if (audioRef.current.paused) {
      dispatch(setisplaying(true));
      audioRef.current.play();
    } else {
      dispatch(setisplaying(false));
      audioRef.current.pause();
    }
  };

  const backwardClick = () => {
    if (currentData.length > 0) {
      if ((currentIndex - 1) % currentData.length === -1) {
        dispatch(setcurrentindex(currentData.length - 1));
      } else {
        dispatch(setcurrentindex((currentIndex - 1) % currentData.length));
      }
    }
  };

  const forwardClick = () => {
    currentData.length > 0 &&
      dispatch(setcurrentindex((currentIndex + 1) % currentData.length));
  };

  return (
    <div>
      <div
        className={`flex items-center justify-start gap-6 h-full ${
          !currentSong && "disabled"
        }`}
      >
        <div className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faShuffle} />
        </div>
        <div className="hover:cursor-pointer" onClick={backwardClick}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </div>
        <div
          className="hover:cursor-pointer"
          title={isPlaying ? "Pause" : "Play"}
        >
          <FontAwesomeIcon
            icon={isPlaying ? faCirclePause : faCirclePlay}
            size={"2x"}
            onClick={playHandler}
          />
        </div>
        <div className="hover:cursor-pointer" onClick={forwardClick}>
          <FontAwesomeIcon icon={faForwardStep} />
        </div>
        <div className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faRepeat} />
        </div>
      </div>
    </div>
  );
}
