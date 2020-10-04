import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

export default function Cards(props) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.companyName}
					color='textSecondary'
					gutterBottom
				>
					{props.company.companyName}
				</Typography>
				<Grid container direction='row' justify='space-between'>
					<Grid item>
						<Typography variant='h5' className={classes.stockSymbol}>
							{props.company.symbol}
						</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.stockDetails}>Chart Here</Typography>
					</Grid>
				</Grid>
				<Typography
					className={props.company.change > 0 ? classes.positive : classes.negative}
					color='textSecondary'
				>
					{props.company.change}%
					<Typography className={classes.pos} color='textSecondary'>
						${props.company.latestPrice}
					</Typography>
				</Typography>
				<Typography variant='body2' component='p' className={classes.stockDetails}>
					High: {props.company.high} , Low: {props.company.low}
					<br />
					Open: {props.company.open} , Close: {props.company.close}
				</Typography>
			</CardContent>
			<Grid item container direction='row' justify='flex-end'>
				<CardActions>
					<Button size='small' className={classes.styledButton}>
						View
					</Button>
				</CardActions>
			</Grid>
		</Card>
	);
}
