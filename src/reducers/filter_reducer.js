import { LOAD_PRODUCTS, SET_LISTVIEW, SET_GRIDVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';

// reducer function
const filter_reducer = (state, action) => {
  //updating the filterd product,allproduct from productprovider
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map(p => p.price);
    maxPrice = Math.max(...maxPrice);
    // we will set the price and maxprice at the max value.
    return {
      ...state,
      all_products: [...action.payload], //in filtering always have 2[of same value]
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

  //sort property update dynamically, sorting the filterproduct array
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
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];
    // serach
    if (text) {
      tempProducts = tempProducts.filter(t => {
        return t.name.toLowerCase().startsWith(text);
      });
    }
    // catogery
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === category);
    }
    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => product.company === company);
    }
    // colors have the [[]] so to filter color and find color in that array
    if (color !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.colors.find(c => c === color);
      });
    }

    // price
    tempProducts = tempProducts.filter(product => product.price <= price);
    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter(product => product.shipping === true);
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        // by spreading the values , min price and max price property can be remained with the
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
