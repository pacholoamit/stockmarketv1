import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashBoardTableRow from './DashBoardTableRow';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const StyledTableCell = withStyles((theme) => ({
	body: {
		backgroundColor: '#261f3d',
		color: 'white',
		borderColor: 'rgba(255, 255, 255, 0.16)',
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		color: '#261f3d',
		backgroundColor: '#261f3d',
		maxHeight: 350,
		width: '100%',
	},
	container: {
		maxHeight: 350,
		width: '100%',
	},
	initialRow: {
		fontsize: '25px',
		color: 'rgba(255, 255, 255, 0.7)',
	},
});

function DashboardTable(props) {
	const { history } = props;
	const { transactionData } = props;
	const classes = useStyles();

	const filteredArray = transactionData.filter((data) => {
		return data.length !== 0;
	});

	function handleClick() {
		toast.notify('💸 Please take a look at our Top Performers', {
			position: 'top-right',
		});
		history.push('/');
	}

	return (
		<TableContainer className={classes.container}>
			<Table className={classes.table} aria-label='customized table'>
				<TableBody>
					<StyledTableRow onClick={handleClick} style={{ cursor: 'pointer' }}>
						<StyledTableCell padding='checkbox'>
							<IconButton disableRipple size='small' color='inherit'>
								<AddBoxIcon
									fontSize='50px'
									style={{
										fontSize: '50px',
										margin: '10 0 10 7',
										color: 'rgba(255, 255, 255, 0.7)',
									}}
								/>
							</IconButton>
						</StyledTableCell>
						<StyledTableCell>
							<Typography className={classes.initialRow}>
								Add more stocks to your porfolio
							</Typography>
						</StyledTableCell>
						<StyledTableCell></StyledTableCell>
					</StyledTableRow>
					{filteredArray.map((row) => (
						<DashBoardTableRow row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
export default withRouter(DashboardTable);
