import { useEffect } from "react";
import { useDispatch } from "react-redux"
import OrderSummery from "./OrderSummery"
import { removeProduct, updateQuantity } from "../../redux/features/cart/cartSlice";

const getId = (product) => product?._id ?? product?.id;

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

    // Lock scroll + close on Escape while open
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') onCartClose?.();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, onCartClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed z-50 inset-0 bg-black bg-opacity-60 transition-opacity opacity-100"
            onClick={onCartClose}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
        >

            <div
                className="fixed right-0 top-0 w-full sm:w-2/3 md:w-1/3 bg-white h-full overflow-y-auto transition-transform translate-x-0"
                style={{ transition: 'transform 300ms cubic-bezier(0.23, 0.47, 0.41, 0.93)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 mt-4">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-xl font-semibold">Your Cart: {products.length} items</h4>
                        <button onClick={() => onCartClose()} aria-label="Close cart"><i className="ri-close-large-fill font-bold text-xl"></i></button>
                    </div>

                    {/* cart details */}
                    <div className="cart-items">
                        {
                            products.length === 0 ? (
                                <div>Your cart is empty.</div>
                            ) : (
                                products.map((product, index) => {
                                    const pid = getId(product);
                                    const price = Number(product.price);
                                    return (
                                    <div key={pid ?? index} className="flex flex-col gap-3 shadow-md p-3 sm:p-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-slate-600 text-white rounded mr-1 px-2 shrink-0">{index + 1}</span>
                                            <img src={product.image} alt={product.name ? `${product.name} product image` : "product image"} className="size-12 object-cover shrink-0 rounded" loading="lazy" />

                                            <div className="min-w-0 flex-1">
                                                <h5 className="text-base font-medium truncate">{product.name}</h5>
                                                <p className="text-gray-600 text-sm">${Number.isFinite(price) ? price.toFixed(2) : '0.00'}</p>
                                            </div>

                                            <div className="ml-auto">
                                                <button onClick={(e) => handleRemoveProduct(e, pid)} aria-label={`Remove ${product.name || 'product'} from cart`} className="text-primary hover:text-red-700 text-sm">Remove</button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start gap-2 pl-9">
                                            <button onClick={() => handleQuantity('decrement', pid)} aria-label="Decrease quantity" className="size-9 flex items-center justify-center rounded bg-gray-200 text-gray-800 hover:bg-slate-600 hover:text-white text-lg">-</button>
                                            <span className="px-2 min-w-8 text-center" aria-live="polite">{product.quantity}</span>
                                            <button onClick={() => handleQuantity('increment', pid)} aria-label="Increase quantity" className="size-9 flex items-center justify-center rounded bg-gray-200 text-gray-800 hover:bg-slate-600 hover:text-white text-lg">+</button>
                                        </div>
                                    </div>
                                    );
                                })
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
