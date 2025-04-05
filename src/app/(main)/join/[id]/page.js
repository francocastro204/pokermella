'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

const ROLES = [
  { id: 'frontend_developer', nombre: 'Frontend Developer', canVote: true },
  { id: 'backend_developer', nombre: 'Backend Developer', canVote: true },
  { id: 'qa', nombre: 'QA Engineer', canVote: true },
  { id: 'tech_lead', nombre: 'Tech Lead', canVote: true },
  { id: 'business', nombre: 'Business', canVote: false },
  { id: 'ux_designer', nombre: 'UX Designer', canVote: false },
  { id: 'scrum_master', nombre: 'Scrum Master', canVote: false }
];

export default function JoinPage({ params }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTextCollapsed, setIsTextCollapsed] = useState(false);
  const [isButtonFilled, setIsButtonFilled] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const buttonRef = useRef(null);

  // Resetear el estado después de 3 segundos
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setIsTextCollapsed(false);
        setIsButtonFilled(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    if (!role) {
      setError('Por favor selecciona un rol');
      return;
    }

    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;
      
      document.documentElement.style.setProperty('--expand-x', `${centerX}px`);
      document.documentElement.style.setProperty('--expand-y', `${centerY}px`);
    }

    // Fase 1: Contraer el texto (300ms)
    setIsTextCollapsed(true);
    
    // Fase 2: Expandir el fondo (500ms)
    setTimeout(() => {
      setIsButtonFilled(true);
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          router.push(`/refinamiento/${params.id}`);
        }, 500);
      }, 500);
    }, 300);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-[500ms] ${
      isButtonFilled ? 'bg-black' : 'bg-white'
    }`}>
      {/* Pseudo-elemento para la expansión */}
      <div 
        className={`absolute inset-0 bg-black transition-transform duration-[500ms] origin-[var(--expand-x)_var(--expand-y)] ${
          isTransitioning ? 'scale-[200]' : 'scale-0'
        }`}
        style={{
          transformOrigin: 'var(--expand-x) var(--expand-y)',
          width: '1px',
          height: '1px',
          borderRadius: '50%',
          left: 'var(--expand-x)',
          top: 'var(--expand-y)',
          transform: isTransitioning ? 'scale(2000)' : 'scale(0)',
          transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className={`transition-all duration-[500ms] ${isTransitioning ? 'scale-110 opacity-0' : 'opacity-100'}`}>
            <Logo className="text-black mb-8" />
          </div>
          
          <div className={`w-full max-w-md space-y-8 transition-opacity duration-[500ms] ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-black text-center mb-6">
                Unirse a Sesión
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2 rounded bg-white/10 border border-black/20 text-black placeholder-black/50 focus:outline-none focus:border-black/50"
                  />
                </div>
                
                <div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-white/10 border border-black/20 text-black placeholder-black/50 focus:outline-none focus:border-black/50"
                  >
                    <option value="">Selecciona un rol</option>
                    {ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </select>
                  {role && !ROLES.find(r => r.id === role)?.canVote && (
                    <p className="mt-2 text-sm text-black/70">
                      Nota: Este rol participa como espectador
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="relative">
                  <button
                    ref={buttonRef}
                    type="submit"
                    className="w-full px-16 py-6 rounded-lg font-bold border-2 border-black text-black uppercase tracking-wider group relative overflow-hidden text-lg"
                  >
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[300ms] ${
                      isTextCollapsed ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    }`}>
                      UNIRSE
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </span>

                    {/* Círculo centrado que se muestra al contraer el texto */}
                    <div 
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[300ms] ${
                        isTextCollapsed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'black'
                      }}
                    />
                  </button>

                  {/* Círculo que llena el botón */}
                  <div 
                    className={`absolute transition-all duration-[500ms] ${
                      isButtonFilled ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '0.5rem',
                      backgroundColor: 'black',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 