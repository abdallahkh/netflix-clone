import React, { useState, useEffect } from "react";
import axios from "../networking/axios";
import "../css/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState([]);

	// on specific conditions run the func
	// conditions is defined inside []
	useEffect(() => {
		// this is how we use async inside useEffect()
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};
	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.name || "")
				.then((url) => {
					//to get the url params
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row_posters">
				{movies.map((movie) => (
					<img
						onClick = {()=>handleClick(movie)}
						key={movie.id}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
						className={`row_poster ${
							isLargeRow && "row_poster_large"
						}`}
					/>
				))}
			</div>

			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};

export default Row;
