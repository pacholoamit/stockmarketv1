import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../context/AuthContext';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	number: {
		'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},
	},
	root: {
		minWidth: 330,
		backgroundColor: '#1a152a',
		outline: 'none',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,

		boxShadow: theme.shadows[5],
	},
	credits: {
		color: 'rgba(255, 255, 255, 0.7)',
		marginBottom: '2px',
		fontSize: '20px',
	},
	companyName: {
		fontSize: '25px',
		color: 'white',
	},
	divider: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
	},
	positive: {
		color: '#0aa793',
		fontSize: '20px',
	},
	negative: {
		color: '#de4c4c',
		fontSize: '20px',
	},
	styledButton: {
		background: 'linear-gradient(45deg, #0aa793 30%, #0aa793 90%)',
		border: 0,
		borderRadius: 2,
		boxShadow: '0 3px 5px 2px rgb(20, 62, 68)',
		color: 'white',
		height: 40,
		padding: '0 30px',
		marginLeft: '8px',
	},
	homeButton: {
		background: 'linear-gradient(45deg, #de4c4c 30%, #de4c4c 90%)',
		border: 0,
		borderRadius: 2,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 40,
		padding: '0 30px',
	},
	inputRoot: {
		'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},

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
	},
}));

export default function AddToPortfolio(props) {
	const classes = useStyles();
	const { iex } = props;
	const { currentUser, db } = useAuth();
	const [userCredits, setUserCredits] = useState();
	const [open, setOpen] = useState(false);
	const [stockQuantity, setStockQuantity] = useState(null);
	const [errorState, setErrorState] = useState(false);
	const [errorDescription, setErrorDescription] = useState('');
	const [disabled, setDisabled] = useState(true);
	const inputStockQuantity = useRef();
	const stockData = iex.quote;
	const stockSymbol = iex.quote.symbol;
	const companyName = iex.quote.companyName;
	const currentDateTime = Date.now().toString();

	const handleClose = () => {
		setOpen(false);
	};

	function handleOpen() {
		if (currentUser) {
			db
				.collection('users')
				.doc(currentUser.email)
				.get()
				.then((credits) => {
					setUserCredits(credits.data().credits);
					setDisabled(false);
				});
			setOpen(true);
		} else {
			toast.notify('Please Log in to avail of this feature', {
				position: 'top-right',
			});
		}
	}
	function handleChange(event) {
		setStockQuantity(event.target.value);
	}

	function saveTransaction() {
		db
			.collection('transactions')
			.doc(currentDateTime)
			.set({
				user: currentUser.email,
				Symbol: stockSymbol,
				CompanyName: companyName,
				Quantity: parseInt(inputStockQuantity.current.value),
				Price: currentPrice,
				TotalCost: totalCost,
				Date: Math.floor(Date.now() / 1000),
			});

		db.collection('users').doc(currentUser.email).set({
			credits: remainingBalance,
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (totalCost > remainingBalance) {
			setErrorState(true);
			setErrorDescription('You are too broke to buy this many');
		} else if (
			isNaN(inputStockQuantity) ||
			inputStockQuantity === 0 ||
			inputStockQuantity === ''
		) {
			setErrorState(true);
			setErrorDescription('Error, please try again');
		} else {
			saveTransaction();
			toast.notify('✔️ Purchase Successful', {
				position: 'top-right',
			});
			setOpen(false);
		}
	}

	function handleDecimal(num) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
	const currentPrice = handleDecimal(stockData.latestPrice);
	const totalCost = stockQuantity
		? handleDecimal(stockData.latestPrice * stockQuantity)
		: '';
	const remainingBalance = userCredits
		? handleDecimal(userCredits - totalCost)
		: '';

	return (
		<div>
			<Button className={classes.styledButton} type='button' onClick={handleOpen}>
				Buy
			</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Card className={classes.root}>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<Typography className={classes.companyName}>
									Are you sure you would like to buy {stockData.companyName}?
								</Typography>
								<Divider className={classes.divider} />
								<br />
								<Grid container direction='column' spacing={3}>
									<Grid item xs={12}>
										<TextField
											type='number'
											error={errorState}
											helperText={errorDescription}
											inputRef={inputStockQuantity}
											variant='filled'
											label='Number of stocks to buy'
											className={classes.inputRoot}
											onChange={handleChange}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.credits}>
											Your credit balance:{' '}
											<Typography className={classes.positive}>${userCredits}</Typography>
										</Typography>
										<Typography className={classes.credits}>
											The price per stock is:{' '}
											<Typography className={classes.negative}>${currentPrice}</Typography>
										</Typography>

										<Typography className={classes.credits}>
											Total cost:{' '}
											<Typography className={classes.negative}> ${totalCost} </Typography>
										</Typography>
										<Typography className={classes.credits}>
											Remaining balance:{' '}
											<Typography
												className={
													remainingBalance >= 0 ? classes.positive : classes.negative
												}
											>
												${remainingBalance}
											</Typography>
										</Typography>
									</Grid>
								</Grid>
								<Divider className={classes.divider} />
								<br />
								<Grid item container direction='row' justify='flex-end'>
									<Button
										variant='contained'
										color='primary'
										type='submit'
										style={{ marginRight: '10px' }}
										disabled={disabled ? true : false}
									>
										Buy stock
									</Button>
									<Button
										variant='contained'
										style={{ backgroundColor: '#de4c4c', color: 'white' }}
										onClick={handleClose}
									>
										Close
									</Button>
								</Grid>
							</form>
						</CardContent>
					</Card>
				</Fade>
			</Modal>
		</div>
	);
}
