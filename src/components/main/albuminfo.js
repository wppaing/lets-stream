import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setcurrentdata,
  setcurrentindex,
  setcurrentsong,
} from "../../features/audio/audioSlice";
import styled from "styled-components";
import { formatDuration, getImage } from "../../utils/util";

export default function AlbumInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/album?id=${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const itemClickHandler = (item, index) => {
    dispatch(setcurrentindex(index));
    // set albumdata to currentData for skip prev functionalities
    dispatch(setcurrentdata(data.tracks));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/song?id=${item.id}`)
      .then((response) => {
        dispatch(setcurrentsong(response.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {data && (
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
                    onClick={() =>
                      navigate(`/artist/${data.artist_list[0].id}`)
                    }
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
      )}
    </>
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
