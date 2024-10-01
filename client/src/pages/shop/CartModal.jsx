import { useDispatch } from "react-redux"
import OrderSummery from "./OrderSummery"
import { removeProduct, updateQuantity } from "../../redux/features/cart/cartSlice";

const CartModal = ({ products, isOpen, onCartClose }) => {
    const dispatch = useDispatch();

    const handleQuantity = (type, id) => {
        const payload = { type, _id: id };

        dispatch(updateQuantity(payload));
    };


    const handleRemoveProduct = (e, id) => {
        e.preventDefault();
        dispatch(removeProduct({ _id: id }));
    };

    return (
        <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ transition: 'opacity 300ms' }}>

            <div className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ transition: 'transform 300ms cubic-bezier(0.23, 0.47, 0.41, 0.93' }}>
                <div className="p-4 mt-4">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-xl font-semibold">Your Cart: {products.length} items</h4>
                        <button onClick={() => onCartClose()}><i className="ri-close-large-fill font-bold text-xl"></i></button>
                    </div>

                    {/* cart details */}
                    <div className="cart-items">
                        {
                            products.length === 0 ? (
                                <div>Your cart is empty.</div>
                            ) : (
                                products.map((product, index) => (
                                    <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4">
                                        <div className="flex items-center">
                                            <span className="bg-slate-600 text-white rounded mr-4 px-2">{index + 1}</span>
                                            <img src={product.image} alt="product image" className="size-12 object-cover mr-4" />

                                            <div>
                                                <h5 className="text-lg font-medium">{product.name}</h5>
                                                <p className="text-gray-600 text-sm">${Number(product.price).toFixed(2)}</p>
                                            </div>

                                            <div className="flex flex-row md:justify-start justify-end items-center mt-2">
                                                <button onClick={() => handleQuantity('decrement', product._id)} className="size-6 flex items-center justify-center px-1 rounded bg-gray-200 text-gray-800 hover:bg-slate-600 hover:text-white ml-9">-</button>
                                                <span className="px-2 mx-1 text-center">{product.quantity}</span>
                                                <button onClick={() => handleQuantity('increment', product._id)} className="size-6 flex items-center justify-center px-1 rounded bg-gray-200 text-gray-800 hover:bg-slate-600 hover:text-white">+</button>
                                            </div>

                                            <div className="ml-5">
                                                <button onClick={(e) => handleRemoveProduct(e, product._id)} className="text-primary hover:text-red-700">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>

                    {/* calculation of carts */}

                    {
                        products.length > 0 && (
                            <OrderSummery></OrderSummery>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default CartModal