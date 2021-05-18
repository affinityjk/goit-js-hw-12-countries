import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryTpl from './templates/countryCard.hbs';
import countriesListTpl from './templates/countriesList.hbs';
import API from './js/fetchCountries';

const refs = getRefs();


