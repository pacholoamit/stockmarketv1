import React, { useEffect, useState } from 'react';
import Ticker from 'react-ticker';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import PageVisibility from 'react-page-visibility';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#1a152a',
		minWidth: '1920px',
	},
	companyName: {
		fontSize: 14,
		color: 'white',
	},
	stockSymbol: {
		color: 'white',
	},

	positive: {
		color: '#0aa793',
		fontSize: 14,
	},
	negative: {
		color: '#de4c4c',
		fontSize: 14,
	},
	stockDetails: {
		color: 'rgba(255, 255, 255, 0.7)',
	},
});
const baseImageUrl = 'https://www.cryptocompare.com/';

function Financeticker() {
	const [pageisVisible, setPageisVisibile] = useState(true);
	const [crypto, setCrypto] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const classes = useStyles();

	const handleVisibilityChange = (isVisible) => {
		setPageisVisibile(isVisible);
	};

	useEffect(() => {
		axios
			.get(
				`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD&api_key=925393dee2466678c0f80b50b2c3b361461af3b85aa446cdd62772d01218ad22`
			)
			.then((resCrypto) => {
				console.log(resCrypto.data.Data);
				setCrypto(resCrypto.data.Data.slice(0, 12));
				setLoading(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const tickerPlaceholderPlaceholder = (
		<Grid item xs={1}>
			<ContentLoader
				speed={2}
				width={200}
				height={105}
				viewBox='0 0 105 200'
				backgroundColor='#a3a3a3'
				foregroundColor='#949494'
			>
				<rect x='30' y='135' rx='3' ry='3' width='50' height='6' />
				<rect x='10' y='50' rx='5' ry='5' width='92' height='72' />
				<rect x='10' y='150' rx='3' ry='3' width='97' height='6' />
				<rect x='30' y='35' rx='3' ry='3' width='50' height='6' />
			</ContentLoader>
		</Grid>
	);

	const tickerPlaceholder = (
		<Card className={classes.root}>
			<CardContent>
				<Grid container direction='row' justify='flex-start' alignItems='baseline'>
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
					{tickerPlaceholderPlaceholder}
				</Grid>
			</CardContent>
		</Card>
	);

	const tickerContent = crypto.map((cryptoData) => (
		<Grid
			item
			container
			direction='column'
			alignItems='center'
			justify='flex-start'
			xs={1}
		>
			<Typography className={classes.companyName}>
				{cryptoData?.CoinInfo.Name}
			</Typography>

			<img
				src={baseImageUrl + cryptoData?.CoinInfo?.ImageUrl}
				alt='cryptoimage'
				width='40'
				height='40'
			/>

			<Typography className={classes.companyName}>
				$
				{(cryptoData?.RAW?.USD?.PRICE).toFixed(2)
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			</Typography>
			<Typography
				className={
					cryptoData?.DISPLAY?.USD?.CHANGEPCTDAY > 0
						? classes.positive
						: classes.negative
				}
			>
				({cryptoData?.DISPLAY?.USD?.CHANGEPCTDAY}%)
			</Typography>
		</Grid>
	));

	const tickerExecution = (
		<Card className={classes.root}>
			<CardContent>
				<Grid container direction='row' justify='flex-start' alignItems='baseline'>
					{tickerContent}
				</Grid>
			</CardContent>
		</Card>
	);

	return isLoading ? (
		<PageVisibility onChange={handleVisibilityChange}>
			{pageisVisible && (
				<Ticker speed={2} mode='run-in'>
					{() => <>{tickerExecution}</>}
				</Ticker>
			)}
		</PageVisibility>
	) : (
		tickerPlaceholder
	);
}

export default Financeticker;
