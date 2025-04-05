// Este archivo es solo para documentación, no tiene funcionalidad

export const routes = {
  // Rutas públicas
  home: '/',
  login: '/login',
  register: '/register',
  
  // Rutas de refinamiento
  nuevoRefinamiento: '/refinamiento/nuevo',
  gestionRefinamiento: (id) => `/refinamiento/${id}`,
  
  // Rutas de estimación
  estimacionOrganizador: (id) => `/estimation/${id}`,
  estimacionParticipante: (id) => `/estimation/${id}/participante`,
  
  // Ruta para unirse
  unirse: (id) => `/join/${id}`,
};

/*
Ejemplos de URLs:

1. Home: http://localhost:3000/
2. Login: http://localhost:3000/login
3. Nuevo refinamiento: http://localhost:3000/refinamiento/nuevo
4. Gestión de refinamiento: http://localhost:3000/refinamiento/abc123
5. Vista de estimación (organizador): http://localhost:3000/estimation/abc123
6. Vista de estimación (participante): http://localhost:3000/estimation/abc123/participante
7. Unirse a sesión: http://localhost:3000/join/abc123

Notas:
- Los [id] son reemplazados por identificadores reales (ej: abc123)
- Las carpetas con (parentesis) son para organización y no afectan la URL
- Todas las rutas son relativas a la raíz del sitio
*/ 