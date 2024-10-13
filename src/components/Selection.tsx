import React from 'react';

interface SelectionProps {
  onSelect: (mode: 'pos' | 'admin') => void;
}

const Selection: React.FC<SelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Seleccione una opción
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => onSelect('pos')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
          >
            Punto de Venta (POS)
          </button>
          <button
            onClick={() => onSelect('admin')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;