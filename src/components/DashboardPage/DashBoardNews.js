import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-elastic-carousel';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useWindowDimensions } from '../viewportDimensions';
import axios from 'axios'

const useStyles = makeStyles({
	root: {
		backgroundColor: '#1a152a',
	},
	companyName: {
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},

	divider: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
	},
	contentManagement: {
		marginBottom: '40px',
	},

	subheader: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.7)',
		fontStyle: 'italic',
	},
	newsCard: {
		backgroundColor: '#1a152a',
		outline: 'none',
	},
	styledButton: {
		background: 'linear-gradient(45deg, #0aa793 30%, #0aa793 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgb(20, 62, 68)',
		color: 'white',
		height: '25px',
		padding: '20px',
		justifyItems: 'flex-end',
	},
});

function DashBoardNews(props) {
	const { finnhubNews } = props;
	const { width } = useWindowDimensions();
	const classes = useStyles();
	const newsInfo = finnhubNews;

	const NewsInfoArray = newsInfo.map((newsInfo) => ({
		headline: newsInfo.headline,
		summary: newsInfo.summary,
		image: newsInfo.image,
		source: newsInfo.source,
		datetime: Date(Math.floor(newsInfo.datetime / 1000)),
		url: newsInfo.url,
	}));

	function truncateString(str, num) {
		if (str.length <= num) {
			return str;
		}
		return str.slice(0, num) + '...';
	}

	const breakpoints = [
		{ width: 0, itemsToShow: 1 },
		{ width: 610, itemsToShow: 2 },
		{ width: 960, itemsToShow: 3 },
		{ width: 1280, itemsToShow: 3 },
	];

	const itemPadding = [10, 5, 5, 5];

	return (
		<>
			{NewsInfoArray.length !== 0 ? (
				<CardContent>
					<Grid
						container
						direction='column'
						justify='flex-start'
						alignitems='center'
					>
					
						<Grid item>
							<Carousel
								breakPoints={breakpoints}
								itemPadding={itemPadding}
								disableArrowsOnEnd={false}
								pagination={false}
								showArrows={width >= 610 ? true : false}
								preventDefaultTouchmoveEvent
							>
								{NewsInfoArray.map((NewsInfoArray) => (
									<Card className={classes.newsCard} raised={true}>
										<CardMedia
											component='img'
											height='140'
											src={NewsInfoArray.image}
											title='News Image'
										/>
										<CardContent style={{ minHeight: '150px' }}>
											<Typography className={classes.companyName}>
												{truncateString(NewsInfoArray.headline, 60)}
											</Typography>
											<Typography className={classes.subheader}>
												{truncateString(NewsInfoArray.summary, 130)}
											</Typography>
										</CardContent>
										<Grid
											item
											container
											direction='row'
											justify='space-between'
											alignItems='center'
										>
											<Grid item xs={7} sm={8}>
												<CardContent>
													<Typography className={classes.subheader}>
														Source: {NewsInfoArray.source}
													</Typography>
												</CardContent>
											</Grid>
											<Grid item container xs={5} sm={3} justify='flex-end'>
												<CardActions>
													<Link
														target='_blank'
														rel='noopener'
														href={NewsInfoArray.url}
														underline='none'
													>
														<Button size='large' className={classes.styledButton}>
															View
														</Button>
													</Link>
												</CardActions>
											</Grid>
										</Grid>
									</Card>
								))}
							</Carousel>
						</Grid>
					</Grid>
				</CardContent>
			) : (
				<CardContent>News for this company is unavailable</CardContent>
			)}
		</>
	);
}

export default DashBoardNews;
