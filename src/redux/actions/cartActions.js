export const addToCart = (item) => {
    return {
      type: 'ADD_TO_CART',
      payload: item,  // The item now includes a unique ID
    };
  };
  
  export const removeFromCart = (id) => {
    return {
      type: 'REMOVE_FROM_CART',
      payload: id,  // Removing item by its unique ID
    };
  };
  
  // Updated confirmBooking action to handle confirmation by item ID
  export const confirmBooking = (id) => {
    return {
      type: 'CONFIRM_BOOKING',
      payload: id,  // The ID of the item being confirmed
    };
  };
  