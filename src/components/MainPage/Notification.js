import React from 'react';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 280,
    backgroundColor: '#1a152a',
  },
  header: {
    fontSize: 18,
    color: 'white',
  },
  stockSymbol: {
    color: 'white',
  },
  pos: {
    marginBottom: 12,
    color: 'white',
  },
  positive: {
    color: '#0aa793',
    marginBottom: 12,
  },
  negative: {
    color: '#de4c4c',
    marginBottom: 12,
  },
  stockDetails: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
    fontSize: '14px'
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

function Notifications() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography className={classes.stockDetails} style={{ paddingLeft: '15px', marginBottom: '20px', marginTop: '20px' }}>
        Note:
        There may be instances where if you view pages of stocks in our "Top Performers" section that it will display incomplete data. This is due to the fact, that our API provider does NOT have complete data for that company at the time of viewing. Rest assured that this issue will be patched on December 2020. If the section "High, Low, Open, and Close" is empty, that is also due to our API provider. Thank you and happy viewing :)
      </Typography>
    </Card>
  )

}
export default Notifications