import React, { useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { withRouter } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
	body: {
		borderColor: 'rgba(255, 255, 255, 0.16)',
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		backgroundColor: '#201a33',
		color: 'white',
		borderColor: 'rgba(255, 255, 255, 0.16)',
		'&:hover': {
			backgroundColor: '#1a152a !important',
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	companySymbol: {
		color: 'white',
		fontWeight: 'bold',
	},
	companyName: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: '12px',
	},
	portfolioPrice: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: '18px',
	},
	positive: {
		color: '#0aa793',
		fontSize: '15px',
	},
	negative: {
		color: '#de4c4c',
		fontSize: '15px',
	},
	tableRow: {
		'& .MuiTableRow-hover': {
			color: 'red !important',
		},
	},
});

function DashBoardTableRow(props) {
	const { history } = props;
	const classes = useStyles();
	const { row } = props;
	const [tableLogo, setTableLogo] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [updatedPrice, setUpdatedPrice] = useState();
	const quantity = row.Quantity;
	const totalCost = row.TotalCost;
	const updatedStockValue = updatedPrice * quantity;
	const gainLoss = totalCost - updatedStockValue;
	const gainLossPercentage = ((totalCost - updatedStockValue) / totalCost) * 100;

	useEffect(() => {
		axios
			.all([
				axios.get(
					`https://finnhub.io/api/v1/stock/profile2?symbol=${row.Symbol}&token=bts889748v6tbbfio5p0`
				),
				axios.get(
					`https://finnhub.io/api/v1/quote?symbol=${row.Symbol}&token=bts889748v6tbbfio5p0`
				),
			])

			.then((response) => {
				setTableLogo(response[0].data.logo);
				setUpdatedPrice(response[1].data.c);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, [row.Symbol]);


	function handleDecimal(num) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}

	function numberFormat(num) {
		var num_parts = num.toString().split('.');
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return num_parts.join('.');
	}

	function handleClick() {
		history.push(`/symbol/${row.Symbol}`);
	}

	return (
		<>
			<StyledTableRow
				hover
				className={classes.tableRow}
				style={{ cursor: 'pointer' }}
				onClick={handleClick}
			>
				<StyledTableCell padding='checkbox' component='th' scope='row'>
					{isLoading ? (
						<Skeleton
							variant='rect'
							style={{ marginLeft: '10px' }}
							height='50px'
							width='50px'
							className={classes.skeleton}
						/>
					) : (
						<img
							style={{ marginLeft: '10px' }}
							src={tableLogo}
							alt={row.Symbol}
							width='50'
							height='50'
						/>
					)}
				</StyledTableCell>
				<StyledTableCell align='left'>
					{<Typography className={classes.companySymbol}>{row.Symbol}</Typography>}
					{isLoading ? (
						<Skeleton />
					) : (
						<Typography className={classes.companyName}>{row.CompanyName}</Typography>
					)}
					{isLoading ? (
						<Skeleton />
					) : (
						<Typography className={classes.companyName}>
							Qty: {row.Quantity}
						</Typography>
					)}
				</StyledTableCell>
				<StyledTableCell align='right'>
					{isLoading ? (
						<Skeleton />
					) : (
						<Typography className={classes.portfolioPrice}>
							${numberFormat(handleDecimal(updatedStockValue))}
						</Typography>
					)}
					{isLoading ? (
						<Skeleton />
					) : (
						<Typography
							className={gainLoss < 0 ? classes.negative : classes.positive}
						>
							${handleDecimal(gainLoss)}
						</Typography>
					)}
					{isLoading ? (
						<Skeleton width='100px' />
					) : (
						<Typography
							className={gainLoss < 0 ? classes.negative : classes.positive}
						>
							({handleDecimal(gainLossPercentage)}%)
						</Typography>
					)}
				</StyledTableCell>
			</StyledTableRow>
		</>
	);
}

export default withRouter(DashBoardTableRow);
