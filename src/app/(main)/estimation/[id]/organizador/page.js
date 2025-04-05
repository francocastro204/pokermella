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

export default function EstimacionOrganizadorPage() {
  const [tiempoRestante, setTiempoRestante] = useState(mockEstimacion.tiempoEstimado);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [participantes, setParticipantes] = useState(mockParticipantes);
  const [timerActivo, setTimerActivo] = useState(true);
  const [tiempoPersonalizado, setTiempoPersonalizado] = useState(5); // minutos
  const [pesoFinal, setPesoFinal] = useState(mockEstimacion.pesoFinal);

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

  const toggleTimer = () => {
    setTimerActivo(!timerActivo);
  };

  const resetTimer = () => {
    setTiempoRestante(tiempoPersonalizado * 60);
    setTimerActivo(true);
    setMostrarResultados(false);
  };

  const siguienteEstimacion = () => {
    // Aquí iría la lógica para pasar a la siguiente estimación
    console.log('Pasando a siguiente estimación');
  };

  const completarEstimacion = (peso) => {
    setPesoFinal(peso);
    // Aquí iría la lógica para guardar en backend
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header con Timer y Controles */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="font-['Press_Start_2P'] text-2xl">Vista del Organizador</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={tiempoPersonalizado}
                  onChange={(e) => setTiempoPersonalizado(Number(e.target.value))}
                  className="w-16 p-2 border border-gray-300 rounded"
                />
                <span className="text-sm">min</span>
              </div>
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
              {pesoFinal && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Peso Final:</span>
                  <span className="font-['Press_Start_2P'] text-xl">{pesoFinal}</span>
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
                <div className="space-y-8">
                  {/* Resumen de votos */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold mb-4">Resumen:</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {['0', '1', '2', '3', '5', '8', '13', '21'].map(valor => (
                        <div key={valor} className="text-center">
                          <div className="font-bold">{valor}</div>
                          <div className="text-sm text-gray-500">
                            {participantes.filter(p => p.voto === valor).length} votos
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Detalle de votos por valor */}
                  <div className="space-y-4">
                    <h3 className="font-bold">Detalle de votos:</h3>
                    {['0', '1', '2', '3', '5', '8', '13', '21'].map(valor => {
                      const votantes = participantes.filter(p => p.voto === valor);
                      if (votantes.length === 0) return null;
                      
                      return (
                        <div key={valor} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold mb-2">Valor: {valor}</div>
                          <div className="flex flex-wrap gap-2">
                            {votantes.map(p => (
                              <span 
                                key={p.id}
                                className="px-2 py-1 bg-gray-200 rounded text-sm"
                              >
                                {p.nombre} ({p.rol})
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selector de peso final */}
                  {!pesoFinal && (
                    <div className="mt-8 p-4 border-t border-gray-200">
                      <h3 className="font-bold mb-4">Seleccionar peso final:</h3>
                      <div className="flex flex-wrap gap-2">
                        {['0', '1', '2', '3', '5', '8', '13', '21'].map(valor => (
                          <button
                            key={valor}
                            onClick={() => completarEstimacion(valor)}
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                          >
                            {valor}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  Los resultados se mostrarán cuando presiones "Mostrar Resultados"
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
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <span className="font-medium">{p.nombre}</span>
                    <span className="text-sm text-gray-500 ml-2">({p.rol})</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                    {mostrarResultados ? (
                      p.voto || '?'
                    ) : (
                      p.voto ? '✓' : '-'
                    )}
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
            {pesoFinal ? (
              <button 
                onClick={siguienteEstimacion}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Siguiente Estimación
              </button>
            ) : (
              <button 
                disabled
                className="bg-gray-300 text-white px-6 py-2 rounded cursor-not-allowed"
              >
                Selecciona un peso final
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 