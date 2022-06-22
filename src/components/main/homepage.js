import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/util";
import {
  setcurrentdata,
  setcurrentindex,
  setcurrentsong,
} from "./../../features/audio/audioSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [artists, setArtists] = useState(null);
  const [topcharts, setTopcharts] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/homepage/artists`)
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/homepage/tophits`)
      .then((response) => {
        setTopcharts(response.data.songs);
      })
      .catch((error) => console.log(error));
  }, []);

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
        {artists &&
          React.Children.toArray(
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
        {topcharts &&
          React.Children.toArray(
            topcharts.map((song) => (
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
