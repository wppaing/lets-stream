import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronUp,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setisplaying } from "../../features/audio/audioSlice";
import { getImage } from "../../utils/util";
import styled from "styled-components";
import { useState } from "react";
import MobileControlDetails from "./mobilecontrolDetails";

export default function MobileControl({ audioRef }) {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.audio);
  const [showDetails, setShowDetails] = useState(false);

  const playPauseHandler = () => {
    if (audioRef.current.paused) {
      dispatch(setisplaying(true));
      audioRef.current.play();
    } else {
      dispatch(setisplaying(false));
      audioRef.current.pause();
    }
  };

  const toggleShowDetails = () => {
    setShowDetails(true);
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  };

  return (
    <Wrapper
      isPlaying={isPlaying}
      className={`flex md:hidden bg-lightGray dark:bg-grayishDark text-grayishDark dark:text-light fixed left-0 bottom-0 w-screen p-2 items-center gap-4 z-[1]`}
    >
      <MobileControlDetails
        audioRef={audioRef}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      <div>
        {currentSong ? (
          <img
            className="w-16 rounded-full rotate"
            src={getImage(currentSong.images, 100)}
            alt={currentSong.name}
          />
        ) : (
          <div
            className={`w-16 h-16 rounded-full border-border border bg-lightGray dark:bg-grayishDark`}
          ></div>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-base">
            {currentSong ? currentSong.name : "SongName"}
          </h3>
          <p className="text-sm">
            {currentSong ? currentSong.artist_list[0].name : "SongName"}
          </p>
        </div>
        <div className="flex gap-4 mr-4">
          <div onClick={toggleShowDetails}>
            <FontAwesomeIcon icon={faChevronUp} className={`text-[1.3rem]`} />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeart} className={`text-[1.3rem]`} />
          </div>
          <div className="w-[1.5rem]">
            <FontAwesomeIcon
              className={`text-[1.3rem]`}
              icon={isPlaying ? faPause : faPlay}
              onClick={playPauseHandler}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @keyframes img-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .rotate {
    animation: img-spin infinite 10s linear;
    animation-play-state: ${(props) => !props.isPlaying && "paused"};
  }
`;
