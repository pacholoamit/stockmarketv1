import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#1a152a',
	},
	companyName: {
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},

	divider: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
	},

	subheader: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.7)',
		fontStyle: 'italic',
	},

	styledButton: {
		background: 'linear-gradient(45deg, #0aa793 30%, #0aa793 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgb(20, 62, 68)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
	homeButton: {
		background: 'linear-gradient(45deg, #de4c4c 30%, #de4c4c 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
});

function QuoteChart(props) {
	const classes = useStyles();
	let { chartData, symbol, setChartData } = props;
	const [loading, setLoading] = useState(false);
	let currentDate = Math.floor(Date.now() / 1000);
	console.log(symbol);


	const chartRender = chartData.t.map((timestamp, index) => ({
		x: new Date(timestamp * 1000),
		y: [
			(Math.round(chartData.o[index] * 100) / 100).toFixed(2),
			(Math.round(chartData.h[index] * 100) / 100).toFixed(2),
			(Math.round(chartData.l[index] * 100) / 100).toFixed(2),
			(Math.round(chartData.c[index] * 100) / 100).toFixed(2),
		],
	}));

	function handleChange3m() {
		setLoading(true);
		const dateFrom3m = currentDate - 7890000;
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${dateFrom3m}&to=${currentDate}&token=bts889748v6tbbfio5p0`
			)
			.then((res) => {
				setChartData(res.data);
				setLoading(false);
			});
	}
		

	function handleChange6m() {
		setLoading(true);
		const dateFrom6m = currentDate - 15780000;
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${dateFrom6m}&to=${currentDate}&token=bts889748v6tbbfio5p0`
			)
			.then((res) => {
				setChartData(res.data);
				setLoading(false);
			});
	}

	function handleChange1y() {
		setLoading(true);
		const dateFrom1y = currentDate - 31536000;
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${dateFrom1y}&to=${currentDate}&token=bts889748v6tbbfio5p0`
			)
			.then((res) => {
				setChartData(res.data);
				setLoading(false);
			});
	}
	function handleChange3y() {
		setLoading(true);
		const dateFrom3y = currentDate - 94608000;
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${dateFrom3y}&to=${currentDate}&token=bts889748v6tbbfio5p0`
			)
			.then((res) => {
				setChartData(res.data);
				setLoading(false);
			});
	}

	function handleChange5y() {
		setLoading(true);
		const dateFrom5y = currentDate - 157680000;
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${dateFrom5y}&to=${currentDate}&token=bts889748v6tbbfio5p0`
			)
			.then((res) => {
				setChartData(res.data);
				setLoading(false);
			});
	}

	const config = {
		series: [{ name: 'Price', data: chartRender }],
		options: {
			stroke: {
				curve: 'straight',
				width: 3,
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				candlestick: {
					colors: {
						upward: '#0aa793',
						downward: '#de4c4c',
					},
				},
			},

			noData: {
				text: 'Loading',
			},
			chart: {
				type: 'candlestick',
				zoom: {
					enabled: true,
					type: 'xy',
				},
			},

			xaxis: {
				type: 'datetime',
				labels: {
					style: {
						colors: 'rgba(255, 255, 255, 0.7)',
					},
				},
			},
			tooltip: {
				theme: 'dark',
				style: {
					fontFamily: 'Arial',
				},
			},
			yaxis: {
				tooltip: {
					enabled: true,
				},
				labels: {
					style: {
						colors: 'rgba(255, 255, 255, 0.7)',
					},
				},
			},
		},
	};
	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container direction='column' alignItems='stretch' justify='center'>
					<Grid
						item
						container
						direction='row'
						spacing={1}
						justify='flex-start'
						alignItems='flex-end'
					>
						<Typography className={classes.companyName}>Historical Price</Typography>
					</Grid>
					<Grid item>
						<Chart
							options={config.options}
							series={config.series}
							type='area'
							height='320px'
						/>
					</Grid>

					<Grid item container direction='row' justify='flex-end' xs={12}>
						<Button
							color='primary'
							variant='contained'
							size='small'
							onClick={handleChange3m}
							style={{ marginRight: '5px', marginTop: '5px' }}
							disabled={loading ? true : false}
						>
							3m
						</Button>
						<Button
							color='primary'
							variant='contained'
							size='small'
							onClick={handleChange6m}
							style={{ marginRight: '5px', marginTop: '5px' }}
							disabled={loading ? true : false}
						>
							6m
						</Button>
						<Button
							color='primary'
							variant='contained'
							size='small'
							onClick={handleChange1y}
							style={{ marginRight: '5px', marginTop: '5px' }}
							disabled={loading ? true : false}
						>
							1y
						</Button>
						<Button
							color='primary'
							variant='contained'
							size='small'
							onClick={handleChange3y}
							style={{ marginRight: '5px', marginTop: '5px' }}
							disabled={loading ? true : false}
						>
							3y
						</Button>
						<Button
							color='primary'
							variant='contained'
							size='small'
							onClick={handleChange5y}
							style={{ marginRight: '5px', marginTop: '5px' }}
							disabled={loading ? true : false}
						>
							5y
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default QuoteChart;
