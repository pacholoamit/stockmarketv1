import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RadialChart from './radialChart';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';
import 'toasted-notes/src/styles.css';
import DashboardTable from './DashBoardTable';
import CardHeader from '@material-ui/core/CardHeader';
import _ from 'lodash';
import DashBoardNews from './DashBoardNews';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		marginTop: '10px',
		minWidth: 280,
		height: '500px',
		backgroundColor: '#1a152a',
	},
	rootBottom: {
		minWidth: 280,
		height: '100%',
		backgroundColor: '#1a152a',
	},
	plain: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.7)',
	},
	credits: {
		color: 'white',
		fontSize: 25,
	},
	creditAmount: {
		color: '#0aa793',
		fontSize: 30,
	},
	buttontext: {
		color: 'white',
	},
	radialHeader: {
		backgroundColor: '#261f3d',
		height: '10%',
		color: 'rgba(255, 255, 255, 0.7)',
	},
	styledButton: {
		background: 'linear-gradient(45deg, #0aa793 30%, #0aa793 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgb(20, 62, 68)',
		color: 'white',
		height: '25px',
		padding: '20px',
		justifyItems: 'flex-end',
	},
});
function Dashboardpage(props) {
	const classes = useStyles();
	const { currentUser, db } = useAuth();
	const [userCredits, setUserCredits] = useState();
	const [transactionData, setTransactionData] = useState([]);
	const [newTransactionData, setNewTransactionData] = useState([]);
	const [finnhubNews, setFinnhubNews] = useState([]);

	function numberFormat(num) {
		var num_parts = num.toString().split('.');
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return num_parts.join('.');
	}

	useEffect(() => {
		db
			.collection('users')
			.doc(currentUser.email)
			.get()
			.then((credits) => {
				setUserCredits(numberFormat(credits.data().credits));
			});

		db
			.collection('transactions')
			.where('user', '==', currentUser.email)
			.get()
			.then((transactions) => {
				transactions.forEach((firestoreData) => {
					setTransactionData(firestoreData.data());
				});
			});
	}, [db, currentUser.email]);

	useEffect(() => {
		setNewTransactionData([...newTransactionData, transactionData]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionData]);

	useEffect(() => {
		axios
			.get(
				'https://finnhub.io/api/v1/news?category=forex&token=bts889748v6tbbfio5p0'
			)
			.then((res) => {
				setFinnhubNews(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const newArray = Object.values(
		newTransactionData.reduce((acc, o) => {
			if (!acc[o.Symbol]) acc[o.Symbol] = { ...o };
			else {
				acc[o.Symbol].Price += o.Price;
				acc[o.Symbol].Quantity += o.Quantity;
				acc[o.Symbol].TotalCost += o.TotalCost;
			}

			return acc;
		}, {})
	);

	const checker = [null, undefined, [{}], {}, [], ''];
	const filteredArray = newArray.filter(
		(item) => !checker.some((check) => _.isEqual(check, item))
	);

	return (
		<Grid
			container
			direction='row'
			alignItems='flex-start'
			justify='flex-start'
			spacing={2}
		>
			<Grid item xs={12}>
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.credits} color='white'>
							Remaining Credits:
						</Typography>
						<Typography className={classes.creditAmount} color='white'>
							${userCredits}
						</Typography>

						<Typography className={classes.plain}>
							User: {currentUser.email}
						</Typography>
					</CardContent>
					<Grid container direction='column' justify='space-between'>
						<Grid item>
							<DashboardTable transactionData={filteredArray} />
						</Grid>
					</Grid>
				</Card>
			</Grid>

			<Grid item xs={12} md={4} lg={3}>
				<Card className={classes.rootBottom}>
					<CardHeader
						className={classes.radialHeader}
						title='ASSET STRUCTURE'
					></CardHeader>
					<CardContent>
						<RadialChart transactionData={filteredArray} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={8} lg={9}>
				<Card className={classes.rootBottom}>
					<CardHeader
						className={classes.radialHeader}
						title='NEWS CENTER'
					></CardHeader>
					<CardContent>
						{finnhubNews.length !== 0 ? (
							<DashBoardNews finnhubNews={finnhubNews} />
						) : null}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
export default withRouter(Dashboardpage);
