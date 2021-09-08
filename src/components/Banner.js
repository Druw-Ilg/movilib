import React, { useState, useEffect } from "react";
import requests from "../requests";
import axios from "../axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setBanner(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length) + 1
        ]
      );

      return request;
    }
    fetchData();
  }, []);

  const wrap = (str, x) => {
    return str.length > x ? str.substr(0, x - 1) + "..." : str;
  };

  let overview = String(banner.overview);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (banner) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(banner.title ? banner.title : banner.name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search).get("v");
          setTrailerUrl(urlParams);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <header
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${
          banner && banner.backdrop_path
        }")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_info">
        <h1>
          {banner.title
            ? banner.title
            : banner.name
            ? banner.name
            : banner.original_title && banner.original_title}
        </h1>
        <div className="banner_btns">
          <button onClick={() => handleClick(banner)}>Play</button>
          {/* <button>My list</button> */}
        </div>
        <h3>{wrap(overview, 150)}</h3>
      </div>
      <div className="banner_fade"></div>
      <div className="trailer">
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </header>
  );
};

export default Banner;
