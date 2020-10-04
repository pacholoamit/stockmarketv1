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

function Financeticker() {
	const classes = useStyles();
	const [crypto, setCrypto] = useState([]);

	useEffect(() => {
		axios
			.get(
				`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=925393dee2466678c0f80b50b2c3b361461af3b85aa446cdd62772d01218ad22`
			)
			.then((resCrypto) => {
				console.log(resCrypto.data.Data);
				setCrypto(resCrypto.data.Data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const cryptoTicker = crypto.map((cryptoData) => (
		<Grid item xs={12}>
			<Card className={classes.root}>
				<CardContent>
					<Typography
						className={classes.companyName}
						color='textSecondary'
						gutterBottom
					>
						{cryptoData.CoinInfo.FullName}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	));

	return <Ticker>{() => <>{cryptoTicker}</>}</Ticker>;
}

export default Financeticker;
