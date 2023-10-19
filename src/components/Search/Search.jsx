import { useState, useEffect } from 'react';
import { Search as SearchSemantic, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../gql/user';
import ImageNotFound from '../../assets/avatar.png';
import './Search.css';

const Search = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);

  const { data, loading, error } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (data?.search.length > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChange = e => {
    if (e.target.value) {
      setSearch(e.target.value);
    } else {
      setSearch(null);
    }
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };

  return (
    <SearchSemantic
      className='search-users'
      fluid
      input={{ icon: 'search', iconPosition: 'left' }}
      loading={loading}
      value={search || ''}
      onSearchChange={onChange}
      onResultSelect={handleResultSelect}
      results={results}
      resultRenderer={e => <ResultSearch data={e} />}
    />
  );
};

export default Search;

const ResultSearch = ({ data }) => {
  const { avatar, title, username } = data;

  return (
    <Link className='search-users__item' to={`/${username}`}>
      <Image src={avatar ? avatar : ImageNotFound} />
      <div>
        <p>{title}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
};
