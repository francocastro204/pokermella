'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function HomePage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTextCollapsed, setIsTextCollapsed] = useState(false);
  const [isButtonFilled, setIsButtonFilled] = useState(false);
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

  const handleIngresar = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;

      document.documentElement.style.setProperty('--expand-x', `${centerX}px`);
    }

    // Fase 1: Contraer el texto (300ms)
    setIsTextCollapsed(true);

    // Fase 2: Expandir el fondo (500ms)
    setTimeout(() => {
      setIsButtonFilled(true);
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          router.push('/login');
        }, 100);
      }, 100);
    }, 100);
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
          
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={handleIngresar}
              className="mt-8 px-16 py-6 rounded-lg font-bold border-2 border-black text-black uppercase tracking-wider group relative overflow-hidden text-lg"
            >
              <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[300ms] ${
                isTextCollapsed ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}>
                INGRESAR
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
        </div>
      </div>
    </div>
  );
}
