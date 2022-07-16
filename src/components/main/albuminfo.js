import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setcurrentdata,
  setcurrentindex,
  setcurrentsong,
} from "../../features/audio/audioSlice";
import { formatDuration, getImage } from "../../utils/util";

export default function AlbumInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [albumInfo, setAlbumInfo] = useState();
  const [imgLoaded, setImgLoaded] = useState(false);

  const fetcher = async (url) =>
    axios.get(url).then((res) => {
      setAlbumInfo(res.data);
      return res.data;
    });

  const { data, error } = useSWR(
    `${process.env.REACT_APP_BASE_URL}/album?id=${id}`,
    fetcher
  );

  const itemClickHandler = (item, index) => {
    dispatch(setcurrentindex(index));
    // set albumdata to currentData for skip prev functionalities
    dispatch(setcurrentdata(albumInfo.tracks));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/song?id=${item.id}`)
      .then((response) => {
        dispatch(setcurrentsong(response.data));
      })
      .catch((error) => console.log(error));
  };

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Wrapper bgImage={getImage(data.images, 100)}>
      <div className="container relative max-w-5xl mx-auto p-0 sm:p-6  space-y-6">
        <div className="flex flex-col sm:flex-row sm:space-x-6 items-center sm:items-start space-y-6 text-center sm:text-left">
          <div className="w-[150px] h-[150px]">
            <img
              className="w-[150px]"
              src={getImage(data.images, 300)}
              alt={data.name}
              onLoad={() => setImgLoaded(true)}
            />
            <div
              className="w-[150px] h-[150px] bg-light dark:bg-grayishDark"
              style={{ display: imgLoaded ? "none" : "block" }}
            ></div>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-medium">{data.name}</p>
            <p className="text-sm">
              Album by{" "}
              <span
                className="font-medium hover:cursor-pointer"
                onClick={() => navigate(`/artist/${data.artist_list[0].id}`)}
              >
                {`${data.artist_list[0].name}`}
              </span>
            </p>
          </div>
        </div>
        {/* List item */}
        <div className="space-y-2">
          <h3 className="px-4">Tracks</h3>
          <ul>
            {React.Children.toArray(
              data.tracks.map((track, index) => (
                <li
                  className="py-4 px-4 hover:cursor-pointer hover:bg-light dark:hover:bg-grayishDark flex items-center justify-between"
                  onClick={() => itemClickHandler(track, index)}
                >
                  <p>{track.name}</p>
                  <p>{formatDuration(track.play_duration)}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 5rem;

  &::before {
    content: "";
    position: absolute;
    background: url(${(props) => props.bgImage}) no-repeat;
    inset: 0;
    background-size: 100% 200px;
    opacity: 0.5;
    filter: blur(50px);
    height: 50%;
  }
`;
