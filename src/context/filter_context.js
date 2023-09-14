import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //getting products from the product_context
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  //page-reloading and update---------------

  //updating the filterd product,allproduct from productprovider
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS }); //display updated filter
    dispatch({ type: SORT_PRODUCTS }); //dispaly sort product
  }, [products, state.sort, state.filters]); //each time any of one change the page will reload and fetch the data

  //listing buttons-------------------
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  //updating state.sort value--------------
  const updateSort = e => {
    const value = e.target.value; //option,value
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  //filter property update dynamically(state.filter)----------------
  const updateFilters = e => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'category') {
      value = e.target.textContent; //to access the mapped string value
    }
    if (name === 'color') {
      value = e.target.dataset.color;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    console.log('clearFilters');
    // dispatch({ type: CLEAR_FILTERS });
  };

  return <FilterContext.Provider value={{ ...state, updateSort, setGridView, setListView, updateFilters, clearFilters }}>{children}</FilterContext.Provider>;
};

// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
