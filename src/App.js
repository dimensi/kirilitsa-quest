import "./App.css";
import { questions } from "./questions";
import { shuffle } from "lodash";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { H1, Paragraph2 } from "baseui/typography";
import { useCallback, useState } from "react";
import { ALIGN, Radio, RadioGroup } from "baseui/radio";
import { Button } from "baseui/button";
import { useBoolean } from "react-use";
import { Game } from "./Game";
import { Results } from "./Results";

const gameSettings = {
  easy: {
    totalQuestions: 10,
    time: 10,
  },
  medium: {
    totalQuestions: 20,
    time: 5,
  },
  hard: {
    totalQuestions: Infinity,
    time: 3,
  },
};

const modes = [
  {
    key: "easy",
    name: "Легкий",
    description: "10 вопросов, 10 секунд на ответ",
  },
  {
    key: "medium",
    name: "Средний",
    description: "20 вопросов, 5 секунд на ответ",
  },
  {
    key: "hard",
    name: "Сложный",
    description: "45 вопросов, 3 секунды на ответ",
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

  const [gameMode, setGameMode] = useState(null);
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
            <Paragraph2>Выберите режим сложности</Paragraph2>
            <form onSubmit={handleSubmit}>
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
          <Game gameMode={gameSettings[gameMode]} onDone={handleDone} />
        )}
        {answers && <Results answers={answers} />}
      </Block>
    </div>
  );
}

export default App;
