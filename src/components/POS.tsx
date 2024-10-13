import React, { useState, useEffect } from 'react';
import { Product } from '../types';

const POS: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.codigo === product.codigo);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.codigo === product.codigo
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productCode: string) => {
    setCart(cart.filter((item) => item.product.codigo !== productCode));
  };

  const total = cart.reduce((sum, item) => sum + item.product.precio * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Punto de Venta (POS)</h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-2/3 px-2">
          <h2 className="text-xl font-semibold mb-2">Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.codigo} className="border p-4 rounded">
                <img src={product.imagen} alt={product.descripcion} className="w-full h-32 object-cover mb-2" />
                <h3 className="font-semibold">{product.descripcion}</h3>
                <p>Precio: ${product.precio.toFixed(2)}</p>
                <p>Stock: {product.stock}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold mb-2">Carrito</h2>
          {cart.map((item) => (
            <div key={item.product.codigo} className="flex justify-between items-center mb-2">
              <span>{item.product.descripcion} x {item.quantity}</span>
              <span>${(item.product.precio * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item.product.codigo)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="font-bold mt-4">Total: ${total.toFixed(2)}</div>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;