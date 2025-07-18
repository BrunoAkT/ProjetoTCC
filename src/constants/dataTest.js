
const savedHistory = [
    {
        id: 1,
        date: '2025-07-14T00:25:30.000Z',
        emoji: 0,
        hight_frequency: 110,
        hight_frequency_time: '12:34',
        anotation: '10:30 - tive uma discussão com o meu chefe no trabalho',
        avg_frequency: 91,
        frequency: [80, 82, 85, 81, 84, 100, 124, 94, 95, 114],
        BAI_points: 15,
        BAI_interpretation: "Ansiedade leve"
    },
    {
        id: 2,
        date: '2025-07-12T00:38:00.000Z',
        emoji: 1,
        hight_frequency: 90,
        hight_frequency_time: '11:04',
        anotation: '15:22 - tomei energético e fui para a academia, não fiz cardio',
        avg_frequency: 91,
        frequency: [69, 81, 85, 81, 84, 89, 75, 80, 90, 84, 85, 83, 77, 69, 70],
        BAI_points: 3,
        BAI_interpretation: "Ansiedade minima"
    },
    {
        id: 3,
        date: '2025-07-12T00:38:00.000Z',
        emoji: 1,
        hight_frequency: 90,
        hight_frequency_time: '11:04',
        anotation: '15:22 - tomei energético e fui para a academia, não fiz cardio',
        avg_frequency: 91,
        frequency: [69, 81, 85, 81, 84, 89, 75, 80, 90, 84, 85, 83, 77, 69, 70],
        BAI_points: 31,
        BAI_interpretation: "Ansiedade grave"
    },
    {
        id: 4,
        date: '2025-07-12T00:38:00.000Z',
        emoji: 1,
        hight_frequency: 90,
        hight_frequency_time: '11:04',
        anotation: '15:22 - tomei energético e fui para a academia, não fiz cardio',
        avg_frequency: 91,
        frequency: [69, 81, 85, 81, 84, 89, 75, 80, 90, 84, 85, 83, 77, 69, 70],
        BAI_points: 30,
        BAI_interpretation: "Ansiedade moderada"
    }
];
const exercises = [
    {
        id: 1,
        nome: "Respiração Profunda",
        descricao: "Ajuda a reduzir a frequência cardíaca.",
        icone: "respiracao.png",
        duracao: 5,
        rota: "ExercicioRespiracao"
    },
    {
        id: 2,
        nome: "Atenção Plena",
        descricao: "Exercício guiado de mindfulness para focar no presente.",
        icone: "mindfulness.png",
        duracao: 8,
        rota: "ExercicioMindfulness"
    },
    {
        id: 3,
        nome: "Relaxamento Muscular",
        descricao: "Alivia a tensão muscular por meio da contração e relaxamento.",
        icone: "musculo.png",
        duracao: 6,
        rota: "ExercicioRelaxamento"
    },
    {
        id: 4,
        nome: "Visualização Guiada",
        descricao: "Imersão mental em um ambiente calmo e seguro.",
        icone: "paisagem.png",
        duracao: 7,
        rota: "ExercicioVisualizacao"
    },
    {
        id: 5,
        nome: "Journaling Rápido",
        descricao: "Ajuda a identificar e organizar os pensamentos.",
        icone: "anotacoes.png",
        duracao: 4,
        rota: "ExercicioJournaling"
    },
    {
        id: 6,
        nome: "Exercício de Gratidão",
        descricao: "Promove sentimentos positivos ao reconhecer coisas boas.",
        icone: "gratidao.png",
        duracao: 3,
        rota: "ExercicioGratidao"
    },
    {
        id: 7,
        nome: "Alongamento Leve",
        descricao: "Reduz a tensão física acumulada com movimentos simples.",
        icone: "alongamento.png",
        duracao: 5,
        rota: "ExercicioAlongamento"
    },
    {
        id: 8,
        nome: "Respiração Quadrada",
        descricao: "Respiração em ritmo constante para acalmar a mente.",
        icone: "respiracao_quadrada.png",
        duracao: 4,
        rota: "ExercicioQuadrada"
    }
]

export { savedHistory, exercises }