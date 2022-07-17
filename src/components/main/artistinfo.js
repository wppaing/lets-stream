import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getImage } from "../../utils/util";

export default function ArtistInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const { data, error } = useSWR(
    `${process.env.REACT_APP_BASE_URL}/artist?id=${id}`,
    async (url) =>
      axios.get(url).then((res) => {
        document.title = `StreamMM - ${res.data.artist_info.name}`;
        return res.data;
      })
  );

  const itemClickHandler = (item) => {
    navigate(`/album/${item.id}`);
  };

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Wrapper
      bgImage={getImage(data.artist_info.images, 300)}
      className={`sm:p-8`}
    >
      <div
        className={`container max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start p-6 pt-0 sm:space-x-10 space-y-6 text-center sm:text-left rounded-md relative`}
      >
        <div className="w-[170px] h-[170px]">
          <img
            className={`w-[170px] rounded-full shadow-md`}
            src={getImage(data.artist_info.images, 300)}
            alt={data.artist_info.name}
            onLoad={() => setImgLoaded(true)}
          />
          <div
            className="bg-light dark:bg-grayishDark w-[170px] h-[170px] rounded-full"
            style={{ display: imgLoaded ? "none" : "block" }}
          ></div>
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-medium">{data.artist_info.name}</h3>
          <p className="text-md">Artist</p>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto p-4 space-y-2 dark:bg-dark">
        <div className="space-y-4">
          <h3>Albums</h3>
          {React.Children.toArray(
            data.artist_albums.map((album) => (
              <div
                className="w-36 space-y-4 hover:cursor-pointer"
                onClick={() => itemClickHandler(album)}
              >
                <div className="w-36 h-36">
                  <img
                    className="w-36 rounded-sm"
                    src={album.images[0]}
                    alt={album.name}
                  />
                  <div
                    className="bg-light dark:bg-grayishDark w-36 h-36"
                    style={{ display: imgLoaded ? "none" : "block" }}
                  ></div>
                </div>
                <p className="text-sm">{album.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background: url(${(props) => props.bgImage}) no-repeat;
    inset: 0;
    background-size: 100% 200px;
    opacity: 0.5;
    filter: blur(50px);
    height: 30%;
  }
`;
