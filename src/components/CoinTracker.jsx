import React, { useEffect, useState } from 'react';

export default function CoinTracker() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const [money, setMoney] = useState(0);
	const [price, setPrice] = useState(0);
	const [unit, setUnit] = useState('');
	const handleInput = (e) => {
		setMoney(e.target.value);
	};
	const handleSelect = (e) => {
		const value = e.target.value;
		const getCoin = coins.find((coin) => coin.id === value);
		console.log(getCoin);
		setUnit(getCoin.symbol);
		setPrice(getCoin.quotes.USD.price);
	};
	useEffect(() => {
		fetch('https://api.coinpaprika.com/v1/tickers')
			.then((res) => res.json())
			.then((json) => {
				setCoins(json);
				setLoading(false);
			});
	}, []);
	return (
		<div>
			<h1>Coin Tracker</h1>
			<h2>The Coins! {!loading && coins.length}</h2>
			{loading ? (
				<strong>Loading</strong>
			) : (
				<select onChange={handleSelect}>
					<option value='none' selected disabled hidden>
						--- please select coin ---
					</option>
					{coins.map((coin) => (
						<option key={coin.id} value={coin.id}>
							{coin.name} ({coin.symbol}) : $ {coin.quotes.USD.price} USD
						</option>
					))}
				</select>
			)}
			<div>
				<label htmlFor='money'>your money : </label>
				<input
					id='money'
					value={money}
					onChange={handleInput}
					type='number'
					placeholder='please input your money'
				/>
				<p>You can get {price !== 0 ? money / price + ' ' + unit : 'nothing'} !</p>
			</div>
		</div>
	);
}
