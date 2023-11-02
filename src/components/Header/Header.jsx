import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/instaclone.png';
import RightHeader from '../RightHeader/RightHeader';
import Search from '../Search/Search';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <Container>
        <Grid>
          <Grid.Column
            mobile={4}
            tablet={3}
            computer={3}
            className='header__logo'
          >
            <Link to='/'>
              <Image src={Logo} alt='Instaclone' />
            </Link>
          </Grid.Column>
          <Grid.Column mobile={6} tablet={10} computer={10}>
            <Search />
          </Grid.Column>
          <Grid.Column mobile={6} tablet={3} computer={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
