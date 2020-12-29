import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	selectEmpty: {},
}));

export default function DashBoardNewsInput(props) {
	const classes = useStyles();
	const [options, setOptions] = React.useState('');
	const { newsKeys } = props;

	const handleChange = (event) => {
		setOptions(event.target.value);
	};
	console.log(newsKeys);

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id='demo-simple-select-label'>Stock</InputLabel>
			<Select
				
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				value={options}
				onChange={handleChange}
				style={{ backgroundColor: 'white', color: 'black' }}
			>
				{newsKeys.map((id) => (
					<MenuItem value={id}>{id}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
