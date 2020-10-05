import React, { useEffect, useState } from 'react';
import Ticker from 'react-ticker';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		minWidth: 280,
		backgroundColor: '#1a152a',
	},
	companyName: {
		fontSize: 14,
		color: 'white',
	},
	stockSymbol: {
		color: 'white',
	},
	pos: {
		marginBottom: 12,
		color: 'white',
	},
	positive: {
		color: '#0aa793',
		marginBottom: 12,
	},
	negative: {
		color: '#de4c4c',
		marginBottom: 12,
	},
	stockDetails: {
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

const cryptoSource = {
	source0: 0,
	source1: 1,
	source2: 2,
	source3: 3,
	source4: 4,
	source5: 5,
	source6: 6,
	source7: 7,
	source8: 8,
	source9: 9,
};

function Financeticker() {
	const classes = useStyles();
	const [crypto, setCrypto] = useState();
	const [crypto1, setCrypto1] = useState();
	const [crypto2, setCrypto2] = useState();
	const [crypto3, setCrypto3] = useState();
	const [crypto4, setCrypto4] = useState();
	const [crypto5, setCrypto5] = useState();
	const [crypto6, setCrypto6] = useState();
	const [crypto7, setCrypto7] = useState();
	const [crypto8, setCrypto8] = useState();
	const [crypto9, setCrypto9] = useState();

	useEffect(() => {
		axios
			.get(
				`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=925393dee2466678c0f80b50b2c3b361461af3b85aa446cdd62772d01218ad22`
			)
			.then((resCrypto) => {
				console.log(resCrypto.data.Data[cryptoSource.source0]);
				setCrypto(resCrypto.data.Data[cryptoSource.source0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=925393dee2466678c0f80b50b2c3b361461af3b85aa446cdd62772d01218ad22`
			)
			.then((resCrypto) => {
				console.log(resCrypto.data.Data[cryptoSource.source1]);
				setCrypto1(resCrypto.data.Data[cryptoSource.source1]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// const cryptoTicker = crypto.map((cryptoData) => (
	// 	<Grid item container xs={2}>
	// 		<Card className={classes.root}>
	// 			<CardContent>
	// 				<Typography
	// 					className={classes.companyName}
	// 					color='textSecondary'
	// 					gutterBottom
	// 				>
	// 					{cryptoData.CoinInfo.FullName}
	// 				</Typography>
	// 			</CardContent>
	// 		</Card>
	// 	</Grid>
	// ));

	const cryptoTicker = (
		<div>
			<Grid item container xs={2}>
				<Card className={classes.root}>
					<CardContent>
						<Typography
							className={classes.companyName}
							color='textSecondary'
							gutterBottom
						>
							{crypto?.CoinInfo?.Name}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item container xs={2}>
				<Card className={classes.root}>
					<CardContent>
						<Typography
							className={classes.companyName}
							color='textSecondary'
							gutterBottom
						>
							{crypto1?.CoinInfo?.Name}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</div>
	);

	// const cryptoTicker = (
	// 	<Grid item container xs={2}>
	// 		<Card className={classes.root}>
	// 			<CardContent>
	// 				<Typography
	// 					className={classes.companyName}
	// 					color='textSecondary'
	// 					gutterBottom
	// 				>
	// 					{crypto1?.CoinInfo?.Name}
	// 				</Typography>
	// 			</CardContent>
	// 		</Card>
	// 	</Grid>
	// );

	return (
		<Grid container direction='column'>
			<Grid item xs={12}>
				<Ticker speed={2} mode='chain'>
					{() => <>{cryptoTicker}</>}
				</Ticker>
			</Grid>
		</Grid>
	);
}

export default Financeticker;
