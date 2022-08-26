import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { FcSearch } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SearchFormInput,
  SearchButton,
  SearchButtonLabel,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ search }) => {
    onSubmit(search);
  };

  return (
    <Header>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchButton type="submit">
            <FcSearch size={24} />
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>
          <SearchFormInput
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;