import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		).json();
		console.log(json);
	};
	console.log(id);
	useEffect(() => {
		getMovie();
	}, []);
	return (
		<div>
			<h1>Detail</h1>
			<p>{id}</p>
		</div>
	);
}
