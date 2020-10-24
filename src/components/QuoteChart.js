import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		// width: '100vw',
		// maxHeight: '40vh',
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
	const { chartData } = props;

	const chartRender = chartData.t.map((timestamp, index) => ({
		x: new Date(timestamp * 1000),
		y: [
			(Math.round(chartData.o[index] * 100) / 100).toFixed(2),
			(Math.round(chartData.h[index] * 100) / 100).toFixed(2),
			(Math.round(chartData.l[index] * 100) / 100).toFixed(2),
			(Math.round(chartData.c[index] * 100) / 100).toFixed(2),
		],
	}));

	console.log(chartRender);

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
						<Grid item>
							<Typography className={classes.companyName}>
								{props?.iex?.quote?.companyName}
							</Typography>
						</Grid>
						<Grid item>
							<Typography className={classes.subheader}>
								(Jan 1, 2020 ~ Present)
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Chart
							options={config.options}
							series={config.series}
							type='area'
							height='320px'
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default QuoteChart;
