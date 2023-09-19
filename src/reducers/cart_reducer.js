import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions';

const cart_reducer = (state, action) => {
  console.log(state);
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    // if the item is in the cart/not
    const tempItem = state.cart.find(i => i.id === id + color);

    if (tempItem) {
      // if the item exist in the cart
      const tempItem = state.cart.map(cartItem => {
        // if cartitem match existing item in cart(item with same color)
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount; //increase amount
          if (newAmount > cartItem.max) {
            // max amnt reach stop.
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          // if cartitem not match existing item in cart(item without same color)
          return cartItem;
        }
      });
      return { ...state, cart: tempItem };
    } else {
      // constructing new obj for cart if the item is not in cart
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  // remove item filter
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(item => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  //clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  //toggle amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map(item => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_item, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_item += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_item: 0,
        total_amount: 0
      }
    );
    return { ...state, total_item, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
