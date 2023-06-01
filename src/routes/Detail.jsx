import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Detail.module.css';
export default function Detail() {
	const { id } = useParams();
	const [movie, setMovie] = useState({});
	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		).json();
		setMovie(json.data.movie);
		console.log(movie);
		console.log(json);
	};
	// const {}
	console.log(id);
	useEffect(() => {
		getMovie();
	}, []);
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Detail</h1>
			<div className={styles.contents_wrap}>
				<img
					className={styles.contents_img}
					src={movie.large_cover_image}
					alt={movie.title}
				/>
				<div className={styles.contents}>
					<h2>{movie.title}</h2>
					<p>{movie.year}</p>
					<ul className={styles.genres_wrap}>
						Genre:{' '}
						{movie.genres &&
							movie.genres.map((genre) => <li className={styles.genre}>{genre}</li>)}
					</ul>
					<p className={styles.explanation}>{movie.description_full}</p>
				</div>
			</div>
		</div>
	);
}
