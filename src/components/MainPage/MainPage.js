import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Cards from './Cards';
import axios from 'axios';
import Finalticker from './Financeticker';
import Notification from './Notification'
import CardsSkeleton from './CardsSkeleton';

const useStyles = makeStyles({
	headerFont: {
		color: 'white',
		paddingBottom: '5px',
	},
	subHeaderFont: {
		color: 'white',
	},
});

function App() {
	const classes = useStyles();
	const [finance, setFinance] = useState([]);

	useEffect(() => {
		axios
			.all([
				axios.get(
					`https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=pk_f0bc337d62df49f48d9b3bfaeaa602c5&listLimit=12&cache=true`
				),
			])

			.then((res) => {
				setFinance(res[0].data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const cardListSkeleton = (
		<Grid item xs={10} sm={5} md={4} lg={3}>
			<CardsSkeleton />
		</Grid>
	);

	const cadListSkeletonContainer = [
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
		cardListSkeleton,
	];

	const cardListSkeletonArray = cadListSkeletonContainer.map(
		(skeleton) => skeleton
	);

	const cardList = finance.map((company, index) => (
		<Grid item xs={10} sm={5} md={4} lg={3} xl={2}>
			<Cards company={company} index={index} />
		</Grid>
	));
	console.log(finance);
	return (
		<div className={classes.root} style={{ marginBottom: '60px' }}>
			<Grid
				container
				direction='row'
				spacing={5}
				justify='center'
				alignItems='center'
			>
				{/* Do not touch this div */}
				<Grid item xs={12}>
					<div></div>
				</Grid>
				<Grid item container xs={12} justify='center' alignItems='center'>
					<Typography variant='h3' className={classes.headerFont}>
						Eat. Sleep. Stocks & Crypto
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Finalticker />
				</Grid>
				<Grid item xs={12}>
					<Notification />
				</Grid>
				<Grid item container justify='flex-start'>
					<Typography variant='h5' className={classes.subHeaderFont}>
						Top Performers:
					</Typography>
				</Grid>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
					spacing={2}
					md={11}
					style={{ marginBottom: '22px' }}
				>

					{finance.length > 0 && cardList}
					{finance <= 0 && cardListSkeletonArray}
				</Grid >

			</Grid>
		</div>
	);
}

export default App;
