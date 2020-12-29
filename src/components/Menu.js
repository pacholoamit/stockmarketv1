import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';



const useStyles = makeStyles((theme) => ({
	dropdown: {
		'& .MuiMenu-Paper': {
			backgroundColor: '#303030',
		},
	},
}));

function DropDownMenu(props) {

	const { currentUser, logout } = useAuth();
	const classes = useStyles();
	const { history } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	function home() {
		setAnchorEl(null);
		history.push(`/`);
	};

	function signup() {
		setAnchorEl(null);
		history.push(`/signup`);
	}

	function login() {
		setAnchorEl(null);
		history.push(`/login`);
	}

	async function handleLogout() {
		try {
			await logout();
			setAnchorEl(null);
			toast.notify('✔️ Successfully logged out ', {
				position: 'top-right',
			});

			history.push('/login');
		} catch (err) {
			console.log(err);
		}
	}

	function handleClose() {
		setAnchorEl(null);
	}


	
	return (
		<div>
			<IconButton
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				<EqualizerRoundedIcon style={{ color: 'white' }} fontSize='large' />
			</IconButton>

			<Menu
				style={{ marginTop: '43px', paddingRight: '50px' }}
				id='simple-menu'
				anchorEl={anchorEl}
				className={classes.menu}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				type='dark'
			>
				<MenuItem onClick={home}>Home</MenuItem>
				{!currentUser ? (
					<div>
						<MenuItem onClick={signup}>Sign Up</MenuItem>
						<MenuItem onClick={login}>Log-in</MenuItem>
					</div>
				) : (
					<div>
						<MenuItem onClick={() => history.push('/dashboard')}>Dashboard</MenuItem>
						<MenuItem onClick={handleLogout}>Log-Out</MenuItem>
					</div>
				)}
			</Menu>
		
		</div>
	);
}

export default withRouter(DropDownMenu);
