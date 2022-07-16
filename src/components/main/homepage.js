import useSwr from "swr";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/util";
import {
  setcurrentdata,
  setcurrentsong,
} from "./../../features/audio/audioSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const fetcher = async (url) => axios.get(url).then((res) => res.data);

  const { data: artists, error: artistError } = useSwr(
    `${process.env.REACT_APP_BASE_URL}/homepage/artists`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: topcharts, error: topChartError } = useSwr(
    `${process.env.REACT_APP_BASE_URL}/homepage/tophits`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (artistError || topChartError) return <div>Error</div>;
  if (!artists || !topcharts) return <div>Loading...</div>;

  const directPlayer = (id) => {
    dispatch(setcurrentdata([]));
    // dispatch(setcurrentindex(0));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/song?id=${id}`)
      .then((response) => dispatch(setcurrentsong(response.data)))
      .catch((error) => console.log(error));
  };

  return (
    <div className={`container max-w-5xl mx-auto`}>
      <div className="mb-2 font-medium">
        <h3 className="px-4">Verified Artists</h3>
      </div>
      <div className="flex gap-4 overflow-x-scroll noscrollbar mb-8">
        {React.Children.toArray(
          artists.map((artist) => (
            <div
              className={`grow shrink-0 max-w-max w-32 p-2 pb-6 rounded-md text-center space-y-2 hover:cursor-pointer`}
              onClick={() => navigate(`/artist/${artist.artist_info.id}`)}
            >
              <div className="w-32 h-32">
                <img
                  className="rounded-full mx-auto"
                  src={getImage(artist.artist_info.images, 300)}
                  alt={artist.artist_info.name}
                  onLoad={() => setImgLoaded(true)}
                />
                <div
                  className="bg-light dark:bg-grayishDark w-32 h-32 rounded-full"
                  style={{ display: imgLoaded ? "none" : "block" }}
                ></div>
              </div>
              <p>{artist.artist_info.name}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-2 font-medium">
        <h3 className="px-4">Top Hits</h3>
      </div>
      <div className="flex gap-3 overflow-x-scroll noscrollbar">
        {React.Children.toArray(
          topcharts.songs.map((song) => (
            <div
              className={`grow shrink-0 max-w-max w-32 p-2 pb-6 rounded-md text-center space-y-2 hover:cursor-pointer`}
              onClick={() => directPlayer(song.id)}
            >
              <div className="w-32 h-32">
                <img
                  className="w-32 h-32 mx-auto"
                  src={getImage(song.images, 300)}
                  alt={song.name}
                  onLoad={() => setImgLoaded(true)}
                />
                <div
                  className="bg-light dark:bg-grayishDark w-32 h-32 "
                  style={{ display: imgLoaded ? "none" : "block" }}
                ></div>
              </div>
              <p>{song.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
