export const games = {
  quiz: {
    easy: {
      totalQuestions: 10,
      time: 30,
    },
    medium: {
      totalQuestions: 20,
      time: 25,
    },
    hard: {
      totalQuestions: 45,
      time: 20,
    },
  },
  test: {
    easy: {
      totalQuestions: 5,
      time: 60,
      inputMode: true,
    },
    medium: {
      totalQuestions: 10,
      time: 45,
    },
    hard: {
      totalQuestions: 15,
      time: 30,
    },
  },
};

export const texts = (gameSettings) => [
  {
    key: "easy",
    name: "Легкий",
    description: `${gameSettings.easy.totalQuestions} вопросов, ${gameSettings.easy.time} секунд на ответ`,
  },
  {
    key: "medium",
    name: "Средний",
    description: `${gameSettings.medium.totalQuestions} вопросов, ${gameSettings.medium.time} секунд на ответ`,
  },
  {
    key: "hard",
    name: "Сложный",
    description: `${gameSettings.hard.totalQuestions} вопросов, ${gameSettings.hard.time} секунд на ответ`,
  },
];
