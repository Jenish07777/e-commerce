import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // Add / remove wishlist item
  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems.filter(
          (item) => item.id !== product.id
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
          rating: product.rating,
        },
      ];
    });
  };

  // Check whether product is wishlisted
  const isWishlisted = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  // Remove directly
  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};