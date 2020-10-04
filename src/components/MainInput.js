import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: '#1a152a',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}));

function MainInput() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<TextField
				className={classes.textField}
				color='secondary'
				id='filled-full-width'
				placeholder='Search Stock Symbol (I.E. "AAPL", "GOOGL")'
				fullWidth
				margin='normal'
				InputLabelProps={{
					shrink: true,
				}}
				variant='filled'
				inputProps={{
					style: { color: 'white' },
					startadornment: (
						<InputAdornment position='end'>
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
}

export default MainInput;
