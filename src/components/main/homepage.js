import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/util";

export default function HomePage() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    axios
      .get("https://api-streamservice-ss.herokuapp.com/api/homepage/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="mb-4 font-medium">
        <h3>Random artists in our database</h3>
      </div>
      <div className="flex gap-4 overflow-x-scroll noscrollbar">
        {artists &&
          React.Children.toArray(
            artists.map((artist) => (
              <div
                className={`grow shrink-0 max-w-max p-2 pb-6 rounded-md text-center space-y-2 hover:cursor-pointer`}
                onClick={() => navigate(`/artist/${artist.artist_info.id}`)}
              >
                <img
                  className="w-32 rounded-full mx-auto"
                  src={getImage(artist.artist_info.images, 300)}
                  alt={artist.artist_info.name}
                />
                <p>{artist.artist_info.name}</p>
              </div>
            ))
          )}
      </div>
    </>
  );
}
