import React from 'react';
import Chart from 'react-apexcharts';

function ApexChart(props) {
	const { trends} = props
	const config = {
		series: [
			{
				name: 'Strong Buy',
				data: [
					trends[0]?.strongBuy,
					trends[1]?.strongBuy,
					trends[2]?.strongBuy,
					trends[3]?.strongBuy,
					trends[4]?.strongBuy,
				],
			},
			{
				name: 'Buy',
				data: [
					trends[0]?.buy,
					trends[1]?.buy,
					trends[2]?.buy,
					trends[3]?.buy,
					trends[4]?.buy,
				],
			},
			{
				name: 'Sell',
				data: [
					trends[0]?.sell,
					trends[1]?.sell,
					trends[2]?.sell,
					trends[3]?.sell,
					trends[4]?.sell,
				],
			},
			{
				name: 'Strong Sell',
				data: [
					trends[0]?.strongSell,
					trends[1]?.strongSell,
					trends[2]?.strongSell,
					trends[3]?.strongSell,
					trends[4]?.strongSell,
				],
			},
		],

		options: {
			noData: {
				text: 'Recommendation trends unavailable',
				align: 'center',
				verticalAlign: 'middle',
				offsetX: 0,
				offsetY: 0,
			},
			chart: {
				type: 'bar',
				height: 360,
				stacked: true,
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: true,
				},
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			plotOptions: {
				bar: {
					horizontal: false,
				},
			},
			yaxis: {
				labels: {
					show: true,
					style: {
						colors: 'rgba(255, 255, 255, 0.7)',
					},
				},
			},
			xaxis: {
				type: 'datetime',
				categories: [
					props?.trends[0]?.period,
					props?.trends[1]?.period,
					props?.trends[2]?.period,
					props?.trends[3]?.period,
					props?.trends[4]?.period,
				],
				labels: {
					show: true,
					style: {
						colors: 'rgba(255, 255, 255, 0.7)',
					},
				},
			},
			legend: {
				position: 'right',
				offsetY: 40,
				labels: {
					colors: 'rgba(255, 255, 255, 0.7)',
				},
			},
			fill: {
				opacity: 0.8,
			},
		},
	};

	return (
		<div id='chart'>
			<Chart
				options={config.options}
				series={config.series}
				type='bar'
				height={370}
			/>
		</div>
	);
}

export default ApexChart;
