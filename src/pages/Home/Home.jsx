import { Grid } from 'semantic-ui-react';
import './Home.css';
import Feed from '../../components/Feed/Feed';
import UsersNotFollowed from '../../components/UsersNotFollowed/UsersNotFollowed';

const Home = () => {
  return (
    <Grid className='home'>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={11}
          computer={11}
          className='home__left'
        >
          <Feed />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={5} computer={5}>
          <UsersNotFollowed />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
