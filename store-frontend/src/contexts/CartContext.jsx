import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, size, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.size === size
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id &&
          item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          size: size,
          quantity: quantity,
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (id, size) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.id === id && item.size === size)
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (id, size) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id, size) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      )
    );
  };

  // Total number of products in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Shipping
  const shipping =
    subtotal === 0 || subtotal >= 100
      ? 0
      : 10;

  // Total
  const total = subtotal + shipping;

  // Empty entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        shipping,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  return useContext(CartContext);
};