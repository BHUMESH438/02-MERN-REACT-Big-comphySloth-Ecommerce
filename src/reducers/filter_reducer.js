import { LOAD_PRODUCTS, SET_LISTVIEW, SET_GRIDVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';

const filter_reducer = (state, action) => {
  //updating the filterd product,allproduct from productprovider
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map(p => p.price);
    maxPrice = Math.max(...maxPrice);
    // we will set the price and maxprice at the max value.
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  //sort property update dynamically
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name, 'en', { sensitivity: 'base' }));
    }
    return { ...state, filtered_products: tempProducts };
  }

  //filter property update dynamically
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        // setting dynamic input values
        [name]: value
      }
    };
  }

  //each time the state.filter changed page is reloaded dynamically and this function is invoked continuously
  if (action.type === FILTER_PRODUCTS) {
    return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
