export const getWishlist = () => {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  wishlist.push(product);
  saveWishlist(wishlist);
};

export const removeFromWishlist = (productId, selectedColorIndex) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter((product) => !(product.id === productId && (!product.selectedColorIndex || product.selectedColorIndex === selectedColorIndex)));
  saveWishlist(updatedWishlist);
};

// ! KARTA ƏLAVƏ ETMƏ

export const getCardItems = () => {
  const carditems = localStorage.getItem('carditems');
  return carditems ? JSON.parse(carditems) : [];
};

export const saveCardItems = (carditems) => {
  localStorage.setItem('carditems', JSON.stringify(carditems));
};

export const addToCard = (product) => {
  const carditems = getCardItems();
  carditems.push(product);
  saveCardItems(carditems);
};

export const removeFromCard = (productId, selectedColorIndex) => {
  const carditems = getCardItems();
  const updatedCardItems = carditems.filter((product) => !(product.id === productId && (!product.selectedColorIndex || product.selectedColorIndex === selectedColorIndex)));
  saveCardItems(updatedCardItems);
};
