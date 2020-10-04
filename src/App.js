import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MainInput from './components/MainInput';
import Typography from '@material-ui/core/Typography';
import Cards from './components/Cards';
import axios from 'axios';
import Financeticker from './components/Financeticker';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
	root: {},
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
				`https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=Tpk_26c221ff7f0248d297f5d86cb26b6d0d&listLimit=12`
			)
			.then((res) => {
				console.log(res.data);
				setFinance(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const cardList = finance.map((companyInfo, index) => (
		<Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
			<Cards company={companyInfo} index={finance.companyName} />
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
				<Grid item xs={12}>
					<MainInput />
				</Grid>
				<Grid item xs={12}>
					<Financeticker />
				</Grid>
				<Grid item container xs={12} justify='center' alignItems='center'>
					<Typography variant='h3' className={classes.headerFont}>
						Stonks R' Us
					</Typography>
				</Grid>
				<Grid item container justify='flex-start'>
					<Typography variant='h5' className={classes.subHeaderFont}>
						Most Active
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
