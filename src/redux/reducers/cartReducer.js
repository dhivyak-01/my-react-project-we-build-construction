const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],  // Initialize with cart items from localStorage
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const updatedCart = [...state.cartItems, action.payload];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        return { ...state, cartItems: updatedCart };
  
      case 'REMOVE_FROM_CART':
        const filteredCart = state.cartItems.filter(item => item.id !== action.payload);
        localStorage.setItem('cartItems', JSON.stringify(filteredCart));
        return { ...state, cartItems: filteredCart };
  
      case 'CONFIRM_BOOKING':
        const confirmedItemId = action.payload;
        const remainingItems = state.cartItems.filter(item => item.id !== confirmedItemId);
        localStorage.setItem('cartItems', JSON.stringify(remainingItems));
        return { ...state, cartItems: remainingItems };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  