import { useState } from 'react';
import { Row, Col, Image, Button, Modal } from 'antd';
// import { useDispatch } from 'react-redux';
import "./product.css"

// Custom Hook to handle product selection
const useProductSelection = (selectedProduct, setSelectedProduct) => {
  const toggleProductSelection = (product) => {
    const isProductSelected = selectedProduct.some((selectedProduct) => selectedProduct.productId === product.productId);

    if (isProductSelected) {
      const updatedProducts = selectedProduct.filter((selectedProduct) => selectedProduct.productId !== product.productId);
      setSelectedProduct(updatedProducts);
    } else {
      setSelectedProduct([...selectedProduct, product]);
    }
  };

  return { selectedProduct, toggleProductSelection };
};

export default useProductSelection;