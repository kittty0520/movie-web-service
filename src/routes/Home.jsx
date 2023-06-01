import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);

	const getMovies = async () => {
		const response = await fetch(
			'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year'
		);
		const json = await response.json();

		setMovies(json.data.movies);

		setLoading(false);
	};
	useEffect(() => {
		getMovies();
	}, []);
	console.log(movies);

	return (
		<div>
			<h1>Movies</h1>
			{loading ? <p>loading...</p> : null}
			<br />
			{movies
				? movies.map((movie) => (
						<Movie
							key={movie.id}
							id={movie.id}
							coverImg={movie.medium_cover_image}
							title={movie.title}
							summary={movie.summary}
							genres={movie.genres}
						/>
				  ))
				: null}
		</div>
	);
}
