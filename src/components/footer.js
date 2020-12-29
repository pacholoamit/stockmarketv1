import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	headerFont: {
		color: 'white',
		paddingBottom: '5px',
	},
	subHeaderFont: {
		color: 'white',
	},
});

export default function Footer() {
	const classes = useStyles();

	return (
		<Grid
			item
			container
			xs={12}
			justify='center'
			alignItems='center'
			disableGutters
			spacing={40}
			style={{
				paddingTop: '50px',
				paddingBottom: '50px',
				backgroundColor: '#1a152a',
				marginTop: '10px',
				width: '100%',
			}}
		>
			<Typography className={classes.headerFont}>
				Made with{' '}
				<span role='img' aria-label='heart'>
					❤️
				</span>{' '}
				by Pacholo Amit
			</Typography>
		</Grid>
	);
}
