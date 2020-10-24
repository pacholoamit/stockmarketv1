import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Sparkline from './sparkline';

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

function Cards(props) {
	const { history, company } = props;
	const classes = useStyles();
	const [sparkline, setSparkline] = useState([]);

	function truncateString(str, num) {
		if (str.length <= num) {
			return str;
		}
		return str.slice(0, num) + '...';
	}

	useEffect(() => {
		axios
			.all([
				axios.get(
					`https://cloud.iexapis.com/stable/stock/${company.symbol}/chart/1m?token=pk_6e59e7f718154f03a24aea69529c802a&cache=true&chartCloseOnly=true&chartSimplify=true` //2nd API key from IEX
				),
			])
			.then((res) => {
				setSparkline(res[0].data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [company]);

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.companyName}
					color='textSecondary'
					gutterBottom
				>
					{truncateString(company.companyName, 31)}
				</Typography>
				<Grid container direction='row' justify='space-between' alignItems='center'>
					<Grid item>
						<Typography variant='h5' className={classes.stockSymbol}>
							{company.symbol}
						</Typography>
					</Grid>
					<Grid item>
						<Sparkline sparkline={sparkline} />
					</Grid>
				</Grid>
				<Typography
					className={company.change > 0 ? classes.positive : classes.negative}
					color='textSecondary'
				>
					({company.change}%)
					<Typography className={classes.pos} color='textSecondary'>
						${company.latestPrice}
					</Typography>
				</Typography>
				<Typography variant='body2' component='p' className={classes.stockDetails}>
					High: {company.high} , Low: {company.low}
					<br />
					Open: {company.open} , Close: {company.close}
				</Typography>
			</CardContent>
			<Grid item container direction='row' justify='flex-end'>
				<CardActions>
					<Button
						onClick={() => history.push(`/symbol/${company.symbol}`)}
						size='small'
						className={classes.styledButton}
					>
						View
					</Button>
				</CardActions>
			</Grid>
		</Card>
	);
}

export default withRouter(Cards);
