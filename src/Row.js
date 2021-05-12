import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);

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

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row_posters">
				{movies.map((movie) => (
					<img
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
		</div>
	);
};

export default Row;
