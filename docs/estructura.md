# PokerMella - Estructura y Flujo

## Estructura de Rutas

```
/                                   # Landing page / Home
├── /auth
│   ├── /login                     # Login para Scrum/organizador
│   └── /register                  # Registro para Scrum/organizador
│
├── /refinamiento
│   ├── /[id]                      # Vista de gestión de estimaciones
│   └── /nuevo                     # Crear nuevo refinamiento
│
├── /estimation
│   ├── /[id]                      # Vista de votación (organizador)
│   └── /[id]/participante         # Vista de votación (participante)
│
└── /join
    └── /[id]                      # Unirse como participante
```

## Flujo de Usuario

### 1. Organizador (Scrum Master)
1. Ingresa a la plataforma (login/registro)
2. Crea nuevo refinamiento
   - Asigna título y descripción
3. Agrega estimaciones
   - Título
   - Descripción
   - Link de referencia
   - Orden
4. Obtiene link para invitar participantes
5. Inicia sesión de estimación
6. Gestiona la sesión:
   - Controla el timer
   - Muestra/oculta resultados
   - Avanza a siguiente estimación
   - Finaliza refinamiento

### 2. Participante
1. Recibe link de invitación
2. Ingresa nombre y rol
3. Accede a la sesión
4. Para cada estimación:
   - Ve la información de la HU
   - Vota según su rol
   - Ve resultados cuando el organizador los muestra

## Roles y Permisos

### Roles que pueden votar (0-21):
- Desarrollador
- QA
- Tech Lead

### Roles espectadores (☕):
- Negocio
- UX Designer
- Scrum Master

## Estados

### Estado de Refinamiento
- Pendiente
- En Curso
- Completado

### Estado de Estimación
- Pendiente
- En Votación
- Completada

## Estructura de Datos

```javascript
Refinamiento {
  id: string
  titulo: string
  descripcion: string
  creador: {
    id: string
    nombre: string
    rol: string
  }
  fechaCreacion: Date
  estado: 'pendiente' | 'en_curso' | 'completado'
  estimaciones: [
    {
      id: string
      titulo: string
      descripcion: string
      linkReferencia: string
      orden: number
      estado: 'pendiente' | 'en_votacion' | 'completada'
      rondas: [
        {
          numero: number
          votos: [
            {
              participanteId: string
              valor: string // '0'-'21', 'coffee', '?'
              fecha: Date
            }
          ]
          valorFinal: string
          fechaInicio: Date
          fechaFin: Date
        }
      ]
    }
  ]
  participantes: [
    {
      id: string
      nombre: string
      rol: string
      fechaUnion: Date
    }
  ]
}
``` 