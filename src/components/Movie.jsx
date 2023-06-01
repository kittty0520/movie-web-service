import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

export default function Movie({ id, coverImg, title, summary, genres }) {
	return (
		<div className={styles.container}>
			<img className={styles.image} src={coverImg} alt={title} />
			<div className={styles.contents}>
				<h2 className={styles.title}>
					<Link to={`/movie/${id}`}>{title}</Link>
				</h2>
				<p className={styles.explanation}>{summary}</p>
				<ul className={styles.genres_wrap}>
					{genres &&
						genres.map((genre) => (
							<li key={genre} className={styles.genre}>
								{genre}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
Movie.propTypes = {
	id: PropTypes.string.isRequired,
	coverImg: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	genres: PropTypes.string.isRequired,
};
