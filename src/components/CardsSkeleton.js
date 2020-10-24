import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

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

function CardsSkeleton(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Skeleton variant='text' width={180} />
				<Grid container direction='row' justify='space-between' alignItems='center'>
					<Grid item>
						<Skeleton variant='rect' width={100} height={28} />
					</Grid>
					<Grid item>
						<Skeleton variant='rect' width={150} height={50} />
					</Grid>
				</Grid>
				<Skeleton variant='text' width={80} />
				<Skeleton variant='text' width={100} />
				<br />
				<Skeleton variant='text' width={200} />
				<br />
				<Skeleton variant='text' width={200} />
			</CardContent>
			<Grid item container direction='row' justify='flex-end'>
				<Skeleton variant='rect' width={100} height={45} />
			</Grid>
		</Card>
	);
}

export default CardsSkeleton;
