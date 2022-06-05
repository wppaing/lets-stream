import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImage, formatDuration } from "../../utils/util";
import ProgressBar from "./progressbar";

export default function SlideControl({ audioRef }) {
  const navigate = useNavigate();
  const { currentSong, duration, currenttime } = useSelector(
    (state) => state.audio
  );

  return (
    <div className={`col-span-2`}>
      <div className="max-w-xl mx-auto grid grid-cols-[auto_minmax(0,_1fr)] items-center gap-4">
        <div>
          {currentSong ? (
            <img
              className={"w-9"}
              src={getImage(currentSong.images, 300)}
              alt={currentSong.name}
            />
          ) : (
            <div className="w-9 h-9 bg-light dark:bg-dark border-2 border-border disabled"></div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            {currentSong && (
              <>
                <p className="space-x-4">
                  <span>{`${currentSong.name}`}</span>
                  <span
                    className="hover:cursor-pointer font-medium"
                    onClick={() =>
                      navigate(`/artist/${currentSong.artist_list[0].id}`)
                    }
                  >{`${currentSong.artist_list[0].name}`}</span>
                </p>
                <p>{`${formatDuration(currenttime)} / ${formatDuration(
                  duration
                )}`}</p>
              </>
            )}
          </div>
          <div className={`${!currentSong && "disabled"}`}>
            <ProgressBar audioRef={audioRef} height={"12px"} />
          </div>
        </div>
      </div>
    </div>
  );
}
