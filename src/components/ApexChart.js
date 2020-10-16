import React from 'react';
import Chart from 'react-apexcharts';

function ApexChart(props) {
	const config = {
		series: [
			{
				name: 'Strong Buy',
				data: [
					props?.trends[0]?.strongBuy,
					props?.trends[1]?.strongBuy,
					props?.trends[2]?.strongBuy,
					props?.trends[3]?.strongBuy,
					props?.trends[4]?.strongBuy,
				],
			},
			{
				name: 'Buy',
				data: [
					props?.trends[0]?.buy,
					props?.trends[1]?.buy,
					props?.trends[2]?.buy,
					props?.trends[3]?.buy,
					props?.trends[4]?.buy,
				],
			},
			{
				name: 'Sell',
				data: [
					props?.trends[0]?.sell,
					props?.trends[1]?.sell,
					props?.trends[2]?.sell,
					props?.trends[3]?.sell,
					props?.trends[4]?.sell,
				],
			},
			{
				name: 'Strong Sell',
				data: [
					props?.trends[0]?.strongSell,
					props?.trends[1]?.strongSell,
					props?.trends[2]?.strongSell,
					props?.trends[3]?.strongSell,
					props?.trends[4]?.strongSell,
				],
			},
		],

		options: {
			chart: {
				type: 'bar',
				height: 350,
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
				height={350}
			/>
		</div>
	);
}

export default ApexChart;
