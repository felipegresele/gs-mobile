// src/data/mockData.ts

export const getAbrigos = (latitude: number, longitude: number) => [
    {
      id: "abrigo1",
      nome: "Abrigo Escola A",
      latitude: latitude + 0.01,
      longitude: longitude - 0.01,
    },
    {
      id: "abrigo2",
      nome: "Centro Comunitário",
      latitude: latitude - 0.015,
      longitude: longitude + 0.012,
    },
    {
      id: "abrigo3",
      nome: "Igreja São João",
      latitude: latitude - 0.07,
      longitude: longitude + 0.05,
    },
    {
      id: "abrigo4",
      nome: "Clube Recreativo",
      latitude: latitude - 0.02,
      longitude: longitude + 0.03,
    },
  ];
  
  export const getAlertas = (latitude: number, longitude: number) => [
    {
      id: "alerta1",
      descricao: "Foco de incêndio na mata",
      latitude: latitude + 0.012,
      longitude: longitude + 0.004,
    },
    {
      id: "alerta2",
      descricao: "Forte fumaça em um edifício",
      latitude: latitude + 0.07,
      longitude: latitude + 0.04,
    },
  ];
  
  export const getIncendios = (latitude: number, longitude: number) => [
    {
      id: "incendio1",
      descricao: "Incêndio em edifício",
      status: "Forte",
      nivel: 3,
      precisaResgaste: true,
      pessoasAfetadas: 3,
      tipo: "Urbano",
      registradoPor: "usuario123",
      dataHora: new Date().toISOString(),
      fase: "Em andamento",
      latitude: latitude + 0.005,
      longitude: longitude - 0.006,
    },
    {
      id: "incendio2",
      descricao: "Fogo em área de vegetação",
      status: "Moderado",
      nivel: 2,
      precisaResgaste: false,
      pessoasAfetadas: 0,
      tipo: "Florestal",
      registradoPor: "usuario456",
      dataHora: new Date().toISOString(),
      fase: "Sob controle",
      latitude: latitude - 0.008,
      longitude: longitude + 0.004,
    },
    {
      id: "incendio3",
      descricao: "Explosão em galpão industrial",
      status: "Crítico",
      nivel: 5,
      precisaResgaste: true,
      pessoasAfetadas: 12,
      tipo: "Industrial",
      registradoPor: "equipe_bombeiros",
      dataHora: new Date().toISOString(),
      fase: "Não iniciado",
      latitude: latitude + 0.01,
      longitude: longitude + 0.005,
    },
    {
      id: "incendio4",
      descricao: "Incêndio em residência",
      status: "Leve",
      nivel: 1,
      precisaResgaste: false,
      pessoasAfetadas: 1,
      tipo: "Residencial",
      registradoPor: "usuario789",
      dataHora: new Date().toISOString(),
      fase: "Extinto",
      latitude: latitude - 0.006,
      longitude: longitude - 0.005,
    },
  ];
  