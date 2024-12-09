import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, confirmBooking } from "../redux/actions/cartActions";
import { Card, Button } from "react-bootstrap";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));  // Remove item by its unique ID from Redux and LocalStorage
  };

  const handleConfirmBooking = async (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the specific item by id
    const itemToConfirm = cartItems.find(item => item.id === id);

    if (!itemToConfirm) {
      alert('Item not found in the cart.');
      return;
    }

    console.log('Item to confirm:', itemToConfirm);

    try {
      const response = await fetch('http://localhost:5000/api/confirm-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: itemToConfirm }),  // Send the specific item to the server
      });

      const data = await response.json();  // Parse the response body

      if (response.ok) {
        // Remove the item from Redux
        dispatch(confirmBooking(id));  // Pass the id of the confirmed item to update Redux

        // Remove the item from localStorage
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        alert('Booking confirmed and item saved to the database.');
      } else {
        alert(`Failed to confirm booking: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error('Error confirming booking:', err);
      alert('Error confirming booking.');
    }
  };

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map(item => (
          <Card key={item.id} className="mb-3">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.service}</Card.Subtitle>
              <Card.Text>
                <strong>Email:</strong> {item.email} <br />
                <strong>Phone Number:</strong> {item.number} <br />
                <strong>Address:</strong> {item.address} <br />
                <strong>Description:</strong> {item.description}
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
                <Button variant="primary" onClick={() => handleConfirmBooking(item.id)}>
                  Confirm Booking
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default CartPage;
