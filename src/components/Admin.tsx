import React, { useState, useEffect } from 'react';
import { Product } from '../types';

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    codigo: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: '',
  });

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
    setNewProduct({
      codigo: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
    });
    // Aquí se debería guardar en el archivo JSON
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrador de Productos</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={newProduct.codigo}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={newProduct.descripcion}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={newProduct.precio}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL de la imagen"
            value={newProduct.imagen}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Agregar Producto
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Código</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.codigo}>
              <td className="border p-2">{product.codigo}</td>
              <td className="border p-2">{product.descripcion}</td>
              <td className="border p-2">${product.precio.toFixed(2)}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <img src={product.imagen} alt={product.descripcion} className="w-16 h-16 object-cover" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;