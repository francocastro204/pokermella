'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTextCollapsed, setIsTextCollapsed] = useState(false);
  const [isButtonFilled, setIsButtonFilled] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
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

  const handleAction = (action) => {
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
          router.push('/refinamiento');
        }, 500);
      }, 500);
    }, 300);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-[500ms] ${
      isButtonFilled ? 'bg-white' : 'bg-black'
    }`}>
      {/* Pseudo-elemento para la expansión */}
      <div 
        className={`absolute inset-0 bg-white transition-transform duration-[500ms] origin-[var(--expand-x)_var(--expand-y)] ${
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
            <Logo className="text-white mb-8" />
          </div>
          
          <div className={`w-full max-w-md space-y-8 transition-opacity duration-[500ms] ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-black/10 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </h2>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded bg-black/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full px-4 py-2 rounded bg-black/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-2 rounded bg-black/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <button
                    ref={buttonRef}
                    onClick={() => handleAction(isLogin ? 'login' : 'register')}
                    className="w-full px-16 py-6 rounded-lg font-bold border-2 border-white text-white uppercase tracking-wider group relative overflow-hidden text-lg"
                  >
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[300ms] ${
                      isTextCollapsed ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    }`}>
                      {isLogin ? 'INICIAR SESIÓN' : 'REGISTRARSE'}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
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
                        backgroundColor: 'white'
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
                      backgroundColor: 'white',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
                
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full text-white py-2 px-4 rounded border-2 border-white transition uppercase tracking-wider group"
                >
                  <span className="relative">
                    {isLogin ? '¿NO TIENES CUENTA? REGÍSTRATE' : '¿YA TIENES CUENTA? INICIA SESIÓN'}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 