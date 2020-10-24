import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-elastic-carousel';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		// width: '100vw',
		// maxHeight: '50vh',
		backgroundColor: '#1a152a',
	},
	companyName: {
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
	},

	divider: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
	},

	subheader: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.7)',
		fontStyle: 'italic',
	},
	newsCard: {
		backgroundColor: '#1a152a',
		height: 352,
	},
});

function QuoteNews(props) {
	const { iex } = props;
	const classes = useStyles();
	const newsInfo = iex.news;
	const NewsInfoArray = newsInfo.map((newsInfo) => ({
		headline: newsInfo.headline,
		summary: newsInfo.summary,
		image: newsInfo.image,
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
	const itemPadding = [10, 10, 10, 10];
	console.log(NewsInfoArray);

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container direction='column' justify='flex-start' alignitems='center'>
					<Grid item>
						<Typography className={classes.companyName}>Latest News</Typography>
					</Grid>
					<Grid item>
						<Carousel
							breakPoints={breakpoints}
							// enableAutoPlay={true}
							autoPlaySpeed={5000}
							itemPadding={itemPadding}
							disableArrowsOnEnd={false}
							pagination={false}
						>
							{NewsInfoArray.map((NewsInfoArray) => (
								<Card className={classes.newsCard} raised={true}>
									<CardMedia
										component='img'
										height='140'
										src={NewsInfoArray.image}
										title='News Image'
									/>
									<CardContent>
										<Typography className={classes.companyName}>
											{truncateString(NewsInfoArray.headline, 70)}
										</Typography>
										<Typography className={classes.subheader}>
											{truncateString(NewsInfoArray.summary, 170)}
										</Typography>
									</CardContent>
								</Card>
							))}
						</Carousel>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default QuoteNews;
