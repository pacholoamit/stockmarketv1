import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Cards from './components/Cards';
import axios from 'axios';
import Finalticker from './components/Financeticker';

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
			.get(
				`https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=gainers&token=pk_f0bc337d62df49f48d9b3bfaeaa602c5&listLimit=12&cache=true`
			)
			.then((res) => {
				console.log(res.data);
				setFinance(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const cardList = finance.map((companyInfo) => (
		<Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
			<Cards company={companyInfo} />
		</Grid>
	));

	return (
		<div className={classes.root}>
			<Grid
				container
				direction='row'
				spacing={5}
				justify='center'
				alignItems='center'
			>
				{/* Navigation space here */}
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
				<Grid item container justify='flex-start'>
					<Typography variant='h5' className={classes.subHeaderFont}>
						Top Blue Chip Stocks
					</Typography>
				</Grid>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
					spacing={2}
				>
					{cardList}
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
