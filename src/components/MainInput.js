/* eslint-disable no-useless-concat */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DropDownMenu from './Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: '#1a152a',
		color: 'white',
		borderRadius: '20px',
		paddingLeft: '8px',
		paddingRight: '8px',
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
			borderRadius: '30px',
		},
		'& .MuiInputBase-root': {
			borderRadius: '5px',
		},
		'& .MuiFilledInput-root': {
			'& fieldset': {
				// borderRadius: '30px',
			},
		},
	},
}));

function MainInput(props) {
	const { history } = props;
	const classes = useStyles();
	const [options, setOptions] = useState([]);

	// const handleChange = (event, value, reason) => {
	// 	if (reason !== 'clear') {
	// 		history.push(`/symbol/${value.short_name}`);
	// 	}
	// };

	const handleChange = (event, value, reason) => {
		if (reason !== 'clear') {
			history.push(`/symbol/${value.short_name}`);
		}
	};

	function fetchCompanies() {
		axios
			.get(
				`https://fcsapi.com/api-v2/stock/list?country=United-states&access_key=pd9iJJ44bHLB495nQJ9NWDJ`
			)
			.then((res) => {
				setOptions(res?.data?.response);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Grid container direction='row'>
			<Grid item xs={11}>
				<div className={classes.root}>
					<Autocomplete
						noOptionsText='Fetching Data...'
						classes={classes}
						options={options}
						autoHighlight={true}
						blurOnSelect={true}
						clearOnEscape={true}
						fullWidth
						clearOnBlur={true}
						getOptionLabel={(options) =>
							options.name + ' ' + '(' + options.short_name + ')'
						}
						onChange={handleChange}
						renderInput={(params) => (
							<TextField
								{...params}
								id='filled-full-width'
								label='Search Stock Symbol'
								variant='filled'
								color='secondary'
								margin='dense'
								className={classes.inputRoot}
								onClick={fetchCompanies}
							/>
						)}
					/>
				</div>
			</Grid>
			<Grid item container xs={1} alignItems='center' justify='center'>
				<DropDownMenu />
			</Grid>
		</Grid>
	);
}

export default withRouter(MainInput);
