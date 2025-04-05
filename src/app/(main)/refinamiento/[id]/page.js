'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import { routes } from '@/app/routes';

// Data de ejemplo
const mockEstimaciones = [
  {
    id: 1,
    titulo: "Login de usuario",
    descripcion: "Implementar pantalla de login con validaciones",
    link: "https://jira.com/ABC-123",
    estado: "pendiente",
    fecha: new Date().toISOString(),
    peso: null,
    orden: 1
  }
];

export default function GestionRefinamiento({ params }) {
  const [estimaciones, setEstimaciones] = useState(mockEstimaciones);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-['Press_Start_2P'] text-2xl">Refinamiento: Compra de Dólares</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            + Agregar Estimación
          </button>
        </div>

        {/* Lista de Estimaciones */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="font-['Press_Start_2P'] text-xl mb-4">Estimaciones</h2>
          <div className="space-y-4">
            {estimaciones.map((est) => (
              <div 
                key={est.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded flex items-center justify-center cursor-move">
                  ≡
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold">{est.titulo}</h3>
                  <p className="text-sm text-gray-600">{est.descripcion}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  Orden: {est.orden}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Invitados */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="font-['Press_Start_2P'] text-xl mb-4">Invitados</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm mb-2">Link para compartir:</p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}${routes.unirse(params.id)}`}
                className="flex-grow p-2 border border-gray-300 rounded bg-white"
              />
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Copiar
              </button>
            </div>
          </div>
        </div>

        {/* Botón de Iniciar */}
        <div className="flex justify-center">
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-['Press_Start_2P']">
            Iniciar Estimación
          </button>
        </div>
      </div>

      {/* Modal para agregar estimación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Nueva Estimación"
      >
        <form className="space-y-4">
          <div>
            <label className="block font-['Press_Start_2P'] text-sm mb-2">
              Título
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ej: Login de usuario"
            />
          </div>
          <div>
            <label className="block font-['Press_Start_2P'] text-sm mb-2">
              Descripción
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Describe la funcionalidad..."
            />
          </div>
          <div>
            <label className="block font-['Press_Start_2P'] text-sm mb-2">
              Link de Referencia
            </label>
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="https://jira.com/ABC-123"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition font-['Press_Start_2P'] text-sm"
          >
            Agregar
          </button>
        </form>
      </Modal>
    </div>
  );
} 