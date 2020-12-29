import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import QuoteCard from './QuoteCard';
import axios from 'axios';
import QuoteChart from './QuoteChart';
import { makeStyles } from '@material-ui/core/styles';
import QuoteNews from './QuoteNews';
import ScaleLoader from 'react-spinners/ScaleLoader';


const useStyles = makeStyles({
	whiteSpace: {
		paddingBottom: '10px',
	},
	styledButton: {
		background: 'linear-gradient(45deg, #0aa793 30%, #0aa793 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgb(20, 62, 68)',
		color: 'white',
		height: '25px',
		padding: '20px',
		justifyItems: 'flex-end',
	},
});

function InformationPage({
	match: {
		params: { symbol },
	},
}) {
	const classes = useStyles();
	const [iex, setIex] = useState();
	const [finnhub, setFinnhub] = useState('');
	const [chartData, setChartData] = useState(null);
	const [trends, setTrends] = useState('');
	let currentDate = Math.floor(Date.now() / 1000);
	const dateFrom6m = currentDate - 15780000;

	useEffect(() => {
		axios
			.all([
				axios.get(
					`https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,company,news&last=9&token=pk_f0bc337d62df49f48d9b3bfaeaa602c5&cache=true`
				),
				axios.get(
					`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bts889748v6tbbfio5p0`
				),
				axios.get(
					`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=bts889748v6tbbfio5p0`
				),
				axios.get(
					`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${dateFrom6m}&to=${currentDate}&token=bts889748v6tbbfio5p0`
				),
			])

			.then((res) => {
				setIex(res[0].data);
				setFinnhub(res[1].data);
				setTrends(res[2].data);
				setChartData(res[3].data);
			})
			.catch((err) => {
				console.log(err);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [symbol]);


	return iex || chartData ? (
		<Grid container direction='row' spacing={3} alignItems='center'>
			<Grid item xs={12}>
				<div></div>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={4}>
				{iex && <QuoteCard iex={iex} finnhub={finnhub} trends={trends} />}
			</Grid>
			<Grid container direction='column' xs={12} sm={12} md={6} lg={8}>
				<Grid item xs={12} style={{ paddingBottom: '8px' }}>
					{chartData && (
						<>
							<QuoteChart
								chartData={chartData}
								iex={iex}
								className={classes.whiteSpace}
								symbol={symbol}
								setChartData={setChartData}
							/>
							
						</>
					)}
				</Grid>
				<Grid item xs={12}>
					{iex && <QuoteNews iex={iex} />}
				</Grid>
			</Grid>
		</Grid>
	) : (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			style={{ height: '90vh' }}
		>
			<Grid item>
				<ScaleLoader color='#24F0F0' height={50} with={8} margin={3} />
			</Grid>
		</Grid>
	);
}
export default InformationPage;
