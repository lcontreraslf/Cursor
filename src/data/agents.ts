// src/data/agents.ts
import { Agent } from '../types';

export const agents: Agent[] = [
  {
    id: 'a1',
    name: 'Agente Prueba',
    email: 'agent@example.com',
    phone: '+1-000-000-0000',
    photo: '/assets/placeholders/agent-maria.jpg',
    description:
      'Especialista en propiedades residenciales y comerciales. Atención personalizada y experiencia en toda la Región Metropolitana.',
  },
];

export const getAgentById = (id: string): Agent | undefined =>
  agents.find((agent) => agent.id === id);
