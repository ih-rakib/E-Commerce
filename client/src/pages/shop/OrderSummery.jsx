import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from "../../utils/baseURL.js";

const OrderSummery = () => {
  const products = useSelector((state) => state.cart.products);
  const { selectedItems, tax, taxRate, grandTotal, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleClearCart = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };

  // payment integration (local feature) with polished error feedback
  const makePayment = async (e) => {
    e?.preventDefault?.();
    if (!products.length) return;
    setCheckoutMessage("");
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PKEY);
      const body = {
        products: products,
        userId: user?._id,
      };

      const headers = {
        "Content-type": "application/json",
      };

      const response = await fetch(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        setCheckoutMessage("Checkout failed. Please try again.");
        return;
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe redirect error: ", result.error);
        setCheckoutMessage(result.error.message || "Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error: ", error);
      setCheckoutMessage("Checkout failed. Please try again.");
    }
  };

  const safe = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0);

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p className="text-text-dark mt-2">Selected Items: {selectedItems}</p>
        <p>Total Price: ${safe(totalPrice).toFixed(2)}</p>
        <p>
          Tax ({Math.round(safe(taxRate) * 100)}%): ${safe(tax).toFixed(2)}
        </p>
        <h3 className="font-semibold">Grand Total: ${safe(grandTotal).toFixed(2)}</h3>

        <div className="px-4 mb-6">
          <button
            type="button"
            onClick={handleClearCart}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">
              <i className="ri-delete-bin-7-line"></i> Clear Cart
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              makePayment(e);
            }}
            disabled={!products.length}
            className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 disabled:opacity-60"
          >
            <span className="mr-2">
              <i className="ri-bank-card-line"></i> Proceed Checkout
            </span>
          </button>
          {checkoutMessage && (
            <p role="status" className="text-sm text-slate-700 bg-white/70 rounded p-2">
              {checkoutMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
