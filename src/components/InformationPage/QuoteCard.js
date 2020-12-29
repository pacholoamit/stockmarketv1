import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import NumberFormat from 'react-number-format';
import ApexChart from './ApexChart';
import { withRouter } from 'react-router-dom';
import AddToPortfolio from './AddToPortfolio';

const useStyles = makeStyles({
	root: {
		minWidth: 280,
		backgroundColor: '#1a152a',
	},
	companyName: {
		fontSize: 18,
		color: 'white',
	},
	stockSymbol: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
	},
	stockPrice: {
		fontSize: 30,
		color: 'white',
	},
	divider: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
	},
	positive: {
		color: '#0aa793',
		fontSize: 20,
	},
	negative: {
		color: '#de4c4c',
		fontSize: 20,
	},
	subheader: {
		fontSize: 23,
		color: 'white',
	},
	stockDetails: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 14,
	},
	stockDetailsEllipsis: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 14,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
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
});

function QuoteCard(props) {
	const classes = useStyles();
	const { history, iex, finnhub, trends } = props;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid item container direction='column' spacing={2}>
					<Grid
						item
						container
						direction='row'
						justify='space-between'
						alignItems='baseline'
					>
						<Grid item>
							<Typography className={classes.companyName}>
								{iex?.quote?.companyName}
							</Typography>
						</Grid>
						<Grid item container spacing={1}>
							<Grid item>
								<Chip size='medium' color='secondary' label={iex?.company?.industry} />
							</Grid>
							<Grid item>
								<Chip size='medium' color='secondary' label={iex?.company?.sector} />
							</Grid>
						</Grid>
					</Grid>
					<Divider classes={{ root: classes.divider }} />
					<Grid
						item
						container
						direction='row'
						justify='space-between'
						alignItems='flex-start'
					>
						<Grid item xs={3}>
							<Typography className={classes.stockSymbol}>
								{iex?.quote?.symbol}
							</Typography>
						</Grid>
						<Grid
							item
							container='row'
							justify='flex-end'
							alignItems='baseline'
							xs={9}
							spacing={1}
						>
							<Grid item>
								<Typography className={classes.stockPrice}>
									<NumberFormat
										value={iex?.quote?.latestPrice}
										thousandSeparator={true}
										prefix={'$'}
										decimalScale={2}
										displayType={'text'}
									/>
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									className={
										props?.iex?.quote?.changePercent > 0
											? classes.positive
											: classes.negative
									}
								>
									<NumberFormat
										value={iex?.quote?.changePercent * 100}
										thousandSeparator={true}
										suffix={'%)'}
										prefix={'('}
										allowNegative={true}
										displayType={'text'}
										decimalScale={2}
										isNumericString={true}
									/>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography className={classes.subheader}>Stock quote:</Typography>
					</Grid>
					<Grid item container direction='row' justify='space-evenly' spacing={1}>
						<Grid item container direction='column' xs={6} spacing={1}>
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>open: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={finnhub?.o}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>close: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={finnhub?.c}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>high: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={finnhub?.h}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>low: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={finnhub?.l}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>prev. close: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={finnhub?.pc}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
						</Grid>
						<Grid item container direction='column' xs={6} spacing={1}>
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetailsEllipsis}>
									{iex?.quote?.primaryExchange}
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>P/E ratio: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={iex?.quote?.peRatio}
										thousandSeparator={true}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>52week high: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={iex?.quote?.week52High}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>52week low: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={iex?.quote?.week52Low}
										thousandSeparator={true}
										prefix={'$'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
							<Grid
								item
								container
								direction='row'
								justify='space-between'
								alignItems='baseline'
							>
								<Typography className={classes.stockDetails}>(YTD) change: </Typography>
								<Typography className={classes.stockDetails}>
									<NumberFormat
										value={iex?.quote?.ytdChange * 100}
										thousandSeparator={true}
										suffix={'%'}
										displayType={'text'}
										decimalScale={2}
									/>
								</Typography>
							</Grid>
							<Divider classes={{ root: classes.divider }} />
						</Grid>
					</Grid>
					<Grid item container direction='column'>
						<Grid item style={{ marginTop: '10px' }}>
							<Typography className={classes.subheader}>
								Recommendation Trends:
							</Typography>
						</Grid>
					</Grid>
					<Grid item style={{ marginBottom: '13px' }}>
						{trends && <ApexChart {...props} />}
					</Grid>
					<Grid
						item
						container
						direction='row'
						justify='flex-end'
						alignItems='flex-end'
						spacing={1}
					>
						<Grid item>
							<Button
								size='small'
								className={classes.homeButton}
								onClick={() => history.push(`/`)}
							>
								Home
							</Button>
						</Grid>
						<Grid item>
							<AddToPortfolio {...props} />
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
export default withRouter(QuoteCard);
