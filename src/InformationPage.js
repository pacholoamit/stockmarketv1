import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import QuoteCard from './components/QuoteCard';
import axios from 'axios';
import QuoteChart from './components/QuoteChart';

function InformationPage({
	match: {
		params: { symbol },
	},
}) {
	const [iex, setIex] = useState('');
	const [finnhub, setFinnhub] = useState('');
	const [chartData, setChartData] = useState(null);
	const [trends, setTrends] = useState('');
	const [open, setOpen] = useState([]);
	const [high, setHigh] = useState([]);
	const [low, setLow] = useState([]);
	const [close, setClose] = useState([]);
	const [time, setTime] = useState([]);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,company&token=pk_f0bc337d62df49f48d9b3bfaeaa602c5&cache=true`
				),
				axios.get(
					`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bts889748v6tbbfio5p0`
				),
				axios.get(
					`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=bts889748v6tbbfio5p0`
				),
			])

			.then((res) => {
				setIex(res[0].data);
				setFinnhub(res[1].data);
				setTrends(res[2].data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [symbol]);

	useEffect(() => {
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=15&from=1572651390&to=1602623478&token=bts889748v6tbbfio5p0`
			)
			.then((res) => {
				setChartData(res.data);
				setOpen(res.data.o);
				setHigh(res.data.h);
				setLow(res.data.l);
				setClose(res.data.c);
				setTime(res.data.t);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [symbol]);

	return (
		<Grid container direction='row' spacing={3} alignItems='flex-start'>
			<Grid item xs={12}>
				<div></div>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={4}>
				<QuoteCard iex={iex} finnhub={finnhub} trends={trends} />
			</Grid>
			<Grid item container xs={12} sm={12} md={6} lg={8}>
				{chartData && (
					<QuoteChart
						chartData={chartData}
						open={open}
						high={high}
						low={low}
						close={close}
						time={time}
						iex={iex}
					/>
				)}
			</Grid>
		</Grid>
	);
}
export default InformationPage;
