import { Container } from 'semantic-ui-react';
import Header from '../components/Header/Header';

const LayoutBasic = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default LayoutBasic;
