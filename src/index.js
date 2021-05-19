import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/countryCard.hbs';
import countriesListTpl from './templates/countriesList.hbs';
import API from './js/fetchCountries';
import getRefs from './js/getRefs';
import { error } from './js/error';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearchInput, 500));

function onSearchInput(evt) {
  clearContainer();

  const input = evt.target;
  const searchQuery = input.value;

  if (!searchQuery) {
    return;
  } else {
    API.fetchCountries(searchQuery)
      .then(renderCountryCard)
      .catch(onFetchError);
  }
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}

function renderCountryCard(data) {
  if (data.length === 1) { 
    createMarkupCard(data);
  } else if (data.length >= 2 && data.length <= 10) {
    createMarkupList(data);
  } else if (data.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}

function onFetchError() {
  error({
    text: 'Invalid request',
  });
}

function createMarkupCard(data) {
  const markup = countryCardTpl(data);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

function createMarkupList(data) {
  const markup = countriesListTpl(data);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}