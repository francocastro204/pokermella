'use client';

import { useState, useEffect } from 'react';
import PlanningDeck from '@/components/PlanningDeck';

// Data de ejemplo
const mockEstimacion = {
  id: 1,
  titulo: "Login de usuario",
  descripcion: "Implementar pantalla de login con validaciones",
  link: "https://jira.com/ABC-123",
  tiempoEstimado: 300, // 5 minutos en segundos
  pesoFinal: null
};

const mockParticipantes = [
  { id: 1, nombre: "Juan", rol: "developer", voto: "5" },
  { id: 2, nombre: "Ana", rol: "qa", voto: "8" },
  { id: 3, nombre: "Pedro", rol: "tech_lead", voto: null },
  { id: 4, nombre: "María", rol: "scrum_master", voto: "5" },
  { id: 5, nombre: "Carlos", rol: "developer", voto: "3" },
  { id: 6, nombre: "Laura", rol: "qa", voto: "5" },
];

// Simular usuario actual
const mockUsuario = {
  id: 1,
  nombre: "Juan",
  rol: "developer"
};

export default function EstimacionParticipantePage() {
  const [tiempoRestante, setTiempoRestante] = useState(mockEstimacion.tiempoEstimado);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [participantes, setParticipantes] = useState(mockParticipantes);
  const [selectedCard, setSelectedCard] = useState(null);
  const [timerActivo, setTimerActivo] = useState(true);

  useEffect(() => {
    let interval;
    if (timerActivo && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActivo, tiempoRestante]);

  const formatTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  };

  const handleVoto = (valor) => {
    setSelectedCard(valor);
    // Aquí iría la lógica para enviar el voto al backend
  };

  const puedeVotar = ['developer', 'qa', 'tech_lead'].includes(mockUsuario.rol);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header con Timer */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-['Press_Start_2P'] text-2xl">Estimación en Curso</h1>
              <p className="text-gray-500 mt-2">
                Participando como: {mockUsuario.nombre} ({mockUsuario.rol})
              </p>
            </div>
            <div className="font-['Press_Start_2P'] text-4xl">
              {formatTiempo(tiempoRestante)}
            </div>
          </div>
        </div>

        {/* Información de la HU */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
          <div className="absolute bottom-0 right-0 opacity-5 text-[150px] font-bold leading-none -mb-8 -mr-4 transform rotate-12 translate-y-4">
            HU
          </div>
          <div className="relative">
            <h2 className="font-['Press_Start_2P'] text-xl mb-4">{mockEstimacion.titulo}</h2>
            <p className="mb-4 text-gray-700">{mockEstimacion.descripcion}</p>
            <div className="flex items-center justify-between">
              <a 
                href={mockEstimacion.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-2"
              >
                Ver en Jira
                <span className="text-sm">↗</span>
              </a>
              {mockEstimacion.pesoFinal && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Peso Final:</span>
                  <span className="font-['Press_Start_2P'] text-xl">{mockEstimacion.pesoFinal}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Estado de la Votación */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-['Press_Start_2P'] text-xl mb-4">Estado de la Votación</h2>
              {mostrarResultados ? (
                <div className="space-y-6">
                  {/* Resumen de votos */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold mb-4">Resumen de Votos:</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {['0', '1', '2', '3', '5', '8', '13', '21'].map(valor => {
                        const cantidadVotos = participantes.filter(p => p.voto === valor).length;
                        if (cantidadVotos === 0) return null;
                        
                        return (
                          <div key={valor} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                            <div className="font-bold text-xl">{valor}</div>
                            <div className="text-sm text-gray-500">
                              {cantidadVotos} {cantidadVotos === 1 ? 'voto' : 'votos'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Peso Final */}
                  {mockEstimacion.pesoFinal && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold mb-2">Peso Final:</h3>
                      <div className="text-3xl font-bold text-center">
                        {mockEstimacion.pesoFinal}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  Los resultados se mostrarán cuando el organizador presione &quot;Mostrar Resultados&quot;
                </div>
              )}
            </div>
          </div>

          {/* Lista de Participantes */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="font-['Press_Start_2P'] text-xl mb-4">Participantes</h2>
            <div className="space-y-2">
              {participantes.map((p) => (
                <div 
                  key={p.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    p.id === mockUsuario.id ? 'bg-black/5 border-black' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div>
                    <span className="font-medium">{p.nombre}</span>
                    <span className="text-sm text-gray-500 ml-2">({p.rol})</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                    {p.id === mockUsuario.id ? (
                      p.voto || '-'
                    ) : (
                      p.voto ? '✓' : '-'
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 