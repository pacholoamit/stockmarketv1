/* eslint-disable no-useless-concat */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: '#1a152a',
		color: 'white',
	},
	textField: {
		color: 'white',
	},
	chipProps: {
		color: 'orange',
	},
	inputRoot: {
		'& .MuiFilledInput-input': {
			color: 'white',
		},
		'& .MuiFilledInput-root.Mui-focused .MuiFilledInput-input': {
			color: 'white',
		},
		'& .MuiInputLabel-filled': {
			color: 'rgba(255, 255, 255, 0.7)',
		},

		'& .MuiInputLabel-filled .Mui-focused': {
			color: 'rgba(255, 255, 255, 0.7)',
		},
	},
}));

function MainInput(props) {
	const { history } = props;
	const classes = useStyles();
	const [options, setOptions] = useState([]);
	const handleChange = (event, value, reason) => {
		if (reason !== 'clear') {
			history.push(`/symbol/${value.short_name}`);
		}
	};

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			`https://fcsapi.com/api-v2/stock/list?country=United-states&access_key=Kcj8TXJnynnFqzvwPSO7RBHWH74OKF2UF7kW3aIYSgdtM`
	// 		)
	// 		.then((res) => {
	// 			console.log(res?.data?.response);
	// 			setOptions(res?.data?.response);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	return (
		<div className={classes.root}>
			<Autocomplete
				noOptionsText='Fetching Data...'
				classes={classes}
				// options={options}
				autoHighlight={true}
				blurOnSelect={true}
				clearOnEscape={true}
				fullWidth
				clearOnBlur={true}
				getOptionLabel={(options) =>
					options.name + ' ' + '(' + options.short_name + ')'
				}
				onChange={handleChange}
				// onChange={(event, value, reason) => console.log(reason)}
				renderInput={(params) => (
					<TextField
						{...params}
						id='filled-full-width'
						label='Search Crypto Symbol (I.E. "BTC", "ETH")'
						variant='filled'
						color='secondary'
						margin='dense'
						className={classes.inputRoot}
					/>
				)}
			/>
		</div>
	);
}

export default withRouter(MainInput);
