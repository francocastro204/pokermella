'use client';

import { useState } from 'react';

const ROLES = [
  { value: 'frontend_developer', label: 'Frontend Developer' },
  { value: 'backend_developer', label: 'Backend Developer' },
  { value: 'fullstack_developer', label: 'Fullstack Developer' },
  { value: 'qa_engineer', label: 'QA Engineer' },
  { value: 'ux_designer', label: 'UX Designer' },
  { value: 'ui_designer', label: 'UI Designer' },
  { value: 'product_owner', label: 'Product Owner' },
  { value: 'scrum_master', label: 'Scrum Master' },
  { value: 'scrum_master_shadow', label: 'Scrum Master Shadow' },
  { value: 'business_analyst', label: 'Business Analyst' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'stakeholder', label: 'Stakeholder' },
  { value: 'tech_lead', label: 'Tech Lead' },
  { value: 'devops_engineer', label: 'DevOps Engineer' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'data_scientist', label: 'Data Scientist' }
];

export default function CreateRefinementForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    linkJira: '',
    tiempoEstimacion: 5,
    rolesVotantes: ['frontend_developer', 'backend_developer', 'qa_engineer', 'tech_lead']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      rolesVotantes: prev.rolesVotantes.includes(role)
        ? prev.rolesVotantes.filter(r => r !== role)
        : [...prev.rolesVotantes, role]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link de Jira (opcional)
        </label>
        <input
          type="url"
          name="linkJira"
          value={formData.linkJira}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tiempo por Estimación (minutos)
        </label>
        <input
          type="number"
          name="tiempoEstimacion"
          value={formData.tiempoEstimacion}
          onChange={handleChange}
          min="1"
          max="30"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Roles que pueden votar
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map(role => (
            <label key={role.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rolesVotantes.includes(role.value)}
                onChange={() => handleRoleChange(role.value)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm">{role.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Crear Refinamiento
        </button>
      </div>
    </form>
  );
} 