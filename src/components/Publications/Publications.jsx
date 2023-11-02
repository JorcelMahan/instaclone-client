import { Grid } from 'semantic-ui-react';
import PreviewPublication from './PreviewPublication/PreviewPublication';
import './Publications.css';

const Publications = ({ getPublications }) => {
  return (
    <div className='publications'>
      <h1>Publicaciones</h1>
      <Grid columns={4}>
        {getPublications.map(publication => (
          <Grid.Column key={publication.id}>
            <PreviewPublication publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Publications;
