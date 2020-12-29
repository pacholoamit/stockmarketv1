import React from 'react';
import Chart from 'react-apexcharts';

function Sparkline(props) {
	const { sparkline } = props;
	console.log(sparkline);
	const sparklineData = sparkline.map((data) => ({
		x: data.date,
		y: (Math.round(data.close * 100) / 100).toFixed(2),
	}));

	const config = {
		series: [
			{
				data: sparklineData,
			},
		],
		options: {
			theme: {
				palette: 'palette5',
			},
			stroke: {
				curve: 'straight',
				width: 2,
			},
			chart: {
				sparkline: {
					enabled: true,
				},
			},

			tooltip: {
				fixed: {
					enabled: false,
				},
				x: {
					show: true,
				},
				y: {
					title: {
						formatter: function (seriesName) {
							return 'Price:';
						},
					},
				},
				marker: {
					show: false,
				},
			},
		},
	};
	return (
		<Chart
			options={config.options}
			series={config.series}
			type='area'
			width={120}
			height={40}
		/>
	);
}

export default Sparkline;
