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
};

const mockParticipantes = [
  { id: 1, nombre: "Juan", rol: "developer", voto: null },
  { id: 2, nombre: "Ana", rol: "qa", voto: null },
  { id: 3, nombre: "Pedro", rol: "tech_lead", voto: null },
  { id: 4, nombre: "María", rol: "scrum_master", voto: null },
];

export default function EstimacionPage() {
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

  const toggleTimer = () => {
    setTimerActivo(!timerActivo);
  };

  const resetTimer = () => {
    setTiempoRestante(mockEstimacion.tiempoEstimado);
    setTimerActivo(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header con Timer y Controles */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="font-['Press_Start_2P'] text-2xl">Estimación en Curso</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTimer}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                {timerActivo ? '⏸️ Pausar' : '▶️ Reanudar'}
              </button>
              <div className="font-['Press_Start_2P'] text-4xl">
                {formatTiempo(tiempoRestante)}
              </div>
            </div>
          </div>
        </div>

        {/* Información de la HU */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="font-['Press_Start_2P'] text-xl mb-4">{mockEstimacion.titulo}</h2>
          <p className="mb-4 text-gray-700">{mockEstimacion.descripcion}</p>
          <a 
            href={mockEstimacion.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center gap-2"
          >
            Ver en Jira
            <span className="text-sm">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cartas de Votación */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-['Press_Start_2P'] text-xl mb-4">Tu Voto</h2>
              <PlanningDeck 
                userRole="developer"
                selectedValue={selectedCard}
                onSelectCard={handleVoto}
              />
            </div>
          </div>

          {/* Lista de Participantes */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="font-['Press_Start_2P'] text-xl mb-4">Participantes</h2>
            <div className="space-y-2">
              {participantes.map((p) => (
                <div 
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <span className="font-medium">{p.nombre}</span>
                    <span className="text-sm text-gray-500 ml-2">({p.rol})</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                    {mostrarResultados ? (p.voto || '?') : (p.voto ? '✓' : '-')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controles del Organizador */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-center gap-4">
            <button 
              onClick={() => setMostrarResultados(!mostrarResultados)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              {mostrarResultados ? 'Ocultar Resultados' : 'Mostrar Resultados'}
            </button>
            <button 
              onClick={resetTimer}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Reiniciar Votación
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
              Completar Estimación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 