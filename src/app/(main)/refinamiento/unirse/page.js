'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'QA Engineer',
  'Tech Lead',
  'Product Owner',
  'Scrum Master',
  'UX Designer',
  'Business Analyst'
];

export default function JoinRefinementPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTextCollapsed, setIsTextCollapsed] = useState(false);
  const [isButtonFilled, setIsButtonFilled] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    role: ''
  });
  const buttonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;
      
      document.documentElement.style.setProperty('--expand-x', `${centerX}px`);
      document.documentElement.style.setProperty('--expand-y', `${centerY}px`);
    }

    // Fase 1: Contraer el texto (250ms)
    setIsTextCollapsed(true);
    
    // Fase 2: Expandir el fondo (400ms)
    setTimeout(() => {
      setIsButtonFilled(true);
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          router.push('/refinamiento');
        }, 400);
      }, 400);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Pseudo-elemento para la expansión */}
      <div 
        className={`absolute inset-0 bg-white transition-transform duration-[400ms] origin-[var(--expand-x)_var(--expand-y)] ${
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
          transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className={`transition-all duration-[400ms] ${isTransitioning ? 'scale-110 opacity-0' : 'opacity-100'}`}>
            <Logo className="text-white mb-8" />
          </div>
          
          <div className={`w-full max-w-md space-y-8 transition-opacity duration-[400ms] ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Unirse a Sesión
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Código de Sesión"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
                
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                >
                  <option value="">Selecciona tu rol</option>
                  {ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>

                <div className="relative">
                  <button
                    ref={buttonRef}
                    type="submit"
                    className={`w-full border-2 border-white text-white py-2 px-4 rounded font-bold transition-all duration-[250ms] relative z-10 ${
                      isTextCollapsed ? 'scale-0' : 'scale-100'
                    } uppercase tracking-wider group`}
                  >
                    <span className="relative">
                      UNIRSE
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </button>

                  {/* Círculo que se forma al contraer el texto */}
                  <div 
                    className={`absolute transition-all duration-[250ms] ${
                      isTextCollapsed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      left: 'var(--expand-x)',
                      top: 'var(--expand-y)',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />

                  {/* Círculo que llena el botón */}
                  <div 
                    className={`absolute transition-all duration-[400ms] ${
                      isButtonFilled ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '0.25rem',
                      backgroundColor: 'white',
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