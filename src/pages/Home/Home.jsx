import { Grid } from 'semantic-ui-react';
import './Home.css';
import Feed from '../../components/Feed/Feed';

const Home = () => {
  return (
    <Grid className='home'>
      <Grid.Row>
        <Grid.Column width={11} className='home__left'>
          <Feed />
        </Grid.Column>
        <Grid.Column width={5}>right</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
