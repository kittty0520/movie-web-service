import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import styles from './Home.module.css';
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
		<div className={styles.container}>
			<h1 className={styles.title}>Movies</h1>
			{loading ? <p>loading...</p> : null}
			<br />
			<div className={styles.movie_wrap}>
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
		</div>
	);
}
