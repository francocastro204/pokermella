'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import CreateRefinementForm from '@/components/CreateRefinementForm';

const mockRefinamientos = [
  {
    id: 1,
    titulo: "Sprint 24 - Refinamiento",
    descripcion: "Refinamiento de historias para el sprint 24",
    estado: "En curso",
    cantidadHUs: 5,
    fechaCreacion: "2024-03-15",
    creador: "Juan Pérez"
  },
  {
    id: 2,
    titulo: "Sprint 23 - Refinamiento",
    descripcion: "Refinamiento de historias para el sprint 23",
    estado: "Finalizado",
    cantidadHUs: 8,
    fechaCreacion: "2024-03-01",
    creador: "Ana García"
  }
];

export default function RefinamientoListPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRefinement = (refinementData) => {
    console.log('Nuevo refinamiento:', refinementData);
    // Aquí irá la lógica para guardar en Firebase
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-['Press_Start_2P'] text-4xl text-black">
            Refinamientos
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Crear Refinamiento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRefinamientos.map((refinamiento) => (
            <div 
              key={refinamiento.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-['Press_Start_2P'] text-xl">{refinamiento.titulo}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  refinamiento.estado === 'En curso' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {refinamiento.estado}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{refinamiento.descripcion}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{refinamiento.cantidadHUs} HUs</span>
                <span>Creado por: {refinamiento.creador}</span>
                <span>{new Date(refinamiento.fechaCreacion).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() => router.push(`/refinamiento/${refinamiento.id}`)}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                {refinamiento.estado === 'En curso' ? 'Continuar' : 'Ver Detalles'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Refinamiento"
      >
        <CreateRefinementForm onSubmit={handleCreateRefinement} />
      </Modal>
    </div>
  );
} 