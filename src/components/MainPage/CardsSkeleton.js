import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
	root: {
		minWidth: 280,
		backgroundColor: '#1a152a',
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
