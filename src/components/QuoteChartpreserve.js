import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chart from 'react-apexcharts';

const useStyles = makeStyles({
	root: {
		width: '100vw',
		maxHeight: '50vh',
		backgroundColor: '#1a152a',
	},
	companyName: {
		fontSize: 18,
		color: 'white',
	},
	stockSymbol: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
	},
	stockPrice: {
		fontSize: 30,
		color: 'white',
	},
	divider: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
	},
	positive: {
		color: '#0aa793',
		fontSize: 20,
	},
	negative: {
		color: '#de4c4c',
		fontSize: 20,
	},
	subheader: {
		fontSize: 18,
		color: 'white',
	},
	stockDetails: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 14,
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

	const chartRender = chartData?.map(
		(chartConfig) => (
			{
				x: new Date(chartConfig[4]),
				y: [chartConfig[3], chartConfig[2], chartConfig[1], chartConfig[0]],
			},
			console.log(chartConfig)
		)
	);
	//[0] = c, [1] = h, [2] = l, [3] = O, [4] = t
	// const chartRenderLog = console.log(chartData);

	const config = {
		series: [
			{
				data: [{ chartRender }],
			},
		],
		options: {
			chart: {
				type: 'candlestick',
			},
			title: {
				text: props?.iex?.quote?.companyName,
				align: 'left',
				style: {
					color: 'white',
					fontFamily: 'sans-serif',
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
					<Grid item>
						<Chart
							options={config.options}
							series={config.series}
							type='candlestick'
							height='390px'
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default QuoteChart;
