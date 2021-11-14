import "./App.css";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { H1, Paragraph2 } from "baseui/typography";
import { useCallback, useMemo, useState } from "react";
import { ALIGN, Radio, RadioGroup } from "baseui/radio";
import { Button } from "baseui/button";
import { useBoolean } from "react-use";
import { Game } from "./Game";
import { Results } from "./Results";
import { ButtonGroup, MODE, SIZE } from "baseui/button-group";

const games = {
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

const texts = (gameSettings) => [
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

function App() {
  const [css] = useStyletron();
  const containerStyle = css({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  const blockStyle = css({
    width: "600px",
  });

  const [gameMode, setGameMode] = useState("medium");
  const [gameType, setGameType] = useState("quiz");
  const gameSettings = useMemo(
    () => games[gameType][gameMode],
    [gameMode, gameType]
  );
  const modes = useMemo(() => texts(games[gameType]), [gameType]);
  const [gameIsStart, startGame] = useBoolean(false);
  const [answers, setAnswers] = useState(null);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      startGame();
    },
    [startGame]
  );

  const handleDone = (answers) => {
    setAnswers(answers);
  };
  return (
    <div className={containerStyle}>
      <Block
        className={blockStyle}
        backgroundColor="backgroundSecondary"
        padding="scale800"
      >
        {!gameIsStart && (
          <>
            <H1>Кириллица Квест</H1>
            <Paragraph2>
              Это игра где проверяются ваши навыки преобразования имени в
              транслит. Вам нужно выбрать правильный вариант, правильный не
              только в плане преобразования, но и в порядке написания. Все
              данные взяты с нашего гитлаба. Имена русские взяты из слака, имена
              в транслите взяты из гитлаба. Будьте осторожны!
            </Paragraph2>
            <Paragraph2>
              Есть <b>квиз</b> - выбрать правильный вариант ответа. <br />
              Есть <b>тест</b> - надо написать правильный ответ.
            </Paragraph2>
            <Paragraph2>Выберите режим сложности</Paragraph2>
            <form onSubmit={handleSubmit}>
              <Block marginBottom="scale800">
                <ButtonGroup
                  mode={MODE.radio}
                  selected={gameType === "quiz" ? 0 : 1}
                  onClick={(event, index) => {
                    setGameType(index === 0 ? "quiz" : "test");
                  }}
                  size={SIZE.large}
                >
                  <Button type="button">Квиз</Button>
                  <Button type="button">Тест</Button>
                </ButtonGroup>
              </Block>
              <RadioGroup
                value={gameMode}
                onChange={(e) => setGameMode(e.currentTarget.value)}
                name="gameMode"
                align={ALIGN.vertical}
              >
                {modes.map((mode) => (
                  <Radio
                    value={mode.key}
                    key={mode.key}
                    description={mode.description}
                  >
                    {mode.name}
                  </Radio>
                ))}
              </RadioGroup>
              <Block paddingTop="scale800">
                <Button>Начать!</Button>
              </Block>
            </form>
          </>
        )}
        {gameIsStart && !answers && (
          <Game gameMode={gameSettings} onDone={handleDone} />
        )}
        {answers && <Results answers={answers} />}
      </Block>
    </div>
  );
}

export default App;
