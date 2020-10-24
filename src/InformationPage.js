import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import QuoteCard from './components/QuoteCard';
import axios from 'axios';
import QuoteChart from './components/QuoteChart';
import { makeStyles } from '@material-ui/core/styles';
import QuoteNews from './components/QuoteNews';

const useStyles = makeStyles({
	whiteSpace: {
		paddingBottom: '18px',
	},
});

function InformationPage({
	match: {
		params: { symbol },
	},
}) {
	const classes = useStyles();
	const [iex, setIex] = useState(null);
	const [finnhub, setFinnhub] = useState('');
	const [chartData, setChartData] = useState(null);
	const [trends, setTrends] = useState('');

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
					`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=1577836800&to=1603219192&token=bts889748v6tbbfio5p0`
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
	}, [symbol]);
	console.log(iex);

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=1577836800&to=1602623478&token=bts889748v6tbbfio5p0`
	// 		)
	// 		.then((res) => {
	// 			setChartData(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [symbol]);

	return (
		<Grid container direction='row' spacing={3} alignItems='center'>
			<Grid item xs={12}>
				<div></div>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={4}>
				<QuoteCard iex={iex} finnhub={finnhub} trends={trends} />
			</Grid>
			<Grid container direction='column' xs={12} sm={12} md={6} lg={8} spacing={1}>
				<Grid item xs={12}>
					{chartData && (
						<QuoteChart
							chartData={chartData}
							iex={iex}
							className={classes.whiteSpace}
						/>
					)}
				</Grid>
				<Grid item xs={12}>
					{iex && <QuoteNews iex={iex} />}
				</Grid>
			</Grid>
			{/* <div className={classes.whiteSpace}></div> */}
		</Grid>
	);
}
export default InformationPage;
