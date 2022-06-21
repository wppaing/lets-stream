import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faHeart } from "@fortawesome/free-solid-svg-icons";
import { setshowlrc } from "./../../features/layout/mainSlice";
import VolumeControl from "./volumeControl";
import { useState } from "react";

export default function RightControl({ audioRef }) {
  const dispatch = useDispatch();
  const { showlrc } = useSelector((state) => state.layout);
  const { currentSong } = useSelector((state) => state.audio);
  const [liked, setLiked] = useState(false);

  const setShowLyrics = () => {
    showlrc ? dispatch(setshowlrc(false)) : dispatch(setshowlrc(true));
  };

  const likeHandle = () => {
    setLiked(!liked);
  };

  return (
    <div className={`grid grid-cols-[_1fr_auto] gap-4 items-center text-right`}>
      <div className="flex items-center justify-end gap-2">
        <div
          className={`hover:cursor-pointer mr-2 ${!currentSong && "disabled"}`}
          title="Like"
          onClick={likeHandle}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={liked ? `text-accent` : `text-opacity-80`}
          />
        </div>
        <FontAwesomeIcon icon={faVolumeLow} />
        <VolumeControl
          audioRef={audioRef}
          className={`opacity-70 hover:opacity-100`}
        />
      </div>
      <div className="hover:cursor-pointer" title="Lyrics">
        <p
          onClick={setShowLyrics}
          className={`${
            showlrc && "text-accent"
          } transition-colors duration-300`}
        >
          Lyrics
        </p>
      </div>
    </div>
  );
}
