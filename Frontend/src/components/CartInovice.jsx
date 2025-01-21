import { useEffect } from "react";
import axios from "axios"
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
import "./CartInvoice.css";

const CartInvoice = () => {

  const handlePayment = async () => {
    if(localStorage.getItem('token')==null){
      navigate('/login')
      return;
    }
    try {
      const orderResponse = await axios.post("http://localhost:8081/create-order", {
        amount: totalCost, // Amount in INR
        currency: "INR",
        receipt: "receipt#1",
      });

      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_iAdqdkUeEVN2MW",
        amount,
        currency,
        name: "Needs for you",
        description: "Test Transaction",
        order_id,
        handler: async (response) => {
          const verifyResponse = await axios.post(
            "http://localhost:8081/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyResponse.status === 200) {
            localStorage.removeItem("cart");
            localStorage.removeItem("totalCost")
            alert("Payment Successful!");
            navigate("/");
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "8317698234",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Failed:", error);
    }
  };
    

  const { cart, totalCost,removeFromCart} = useCart();
  const navigate = useNavigate();
  
  useEffect(()=>{
    console.log(localStorage.getItem('token'));
  })

  if (cart.length === 0) {
    return (
      <div className="cart-invoice-empty">
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
    <div className="cart-invoice-container">
      <h1>Invoice</h1>
      <table className="cart-invoice-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>image</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
            <td><img src={item.image} alt="#" width={100}/></td>
              <td>{item.qty}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>₹{(item.qty * item.price).toFixed(2)}</td>
              <td><button onClick={() => removeFromCart(item.id)} className="back-btn">Remove</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="cart-total-label">Total Amount:</td>
            <td className="cart-total-value">₹{totalCost.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <button onClick={handlePayment} className="back-btn">Pay Now</button>

      <button onClick={() => navigate("/")} className="back-btn">
        Back to Dashboard
      </button>
    </div>
    </>
  );
};

export default CartInvoice;