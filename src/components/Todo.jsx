import React, { useState } from 'react';

export default function Todo() {
	const [todo, setTodo] = useState('');
	const [todos, setTodos] = useState([]);
	const onChange = (e) => setTodo(e.target.value);
	const onSubmit = (e) => {
		e.preventDefault();
		if (todo === '') {
			return;
		}
		setTodos((currentArray) => [...currentArray, todo]);
		setTodo('');
	};
	const onClick = (e) => {
		console.log(e.target.className);
		const index = parseInt(e.target.className);
		setTodos((todos) =>
			todos.filter((_, currentIndex) => currentIndex !== index)
		);
	};
	return (
		<div>
			<h1>Your todo : {todos.length}</h1>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					value={todo}
					type='text'
					placeholder='Write your todo'
				/>
				<button>Add</button>
			</form>
			<hr />
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo.toUpperCase()}
						<button className={index} onClick={onClick}>
							❌
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
