import { H1, Paragraph2 } from "baseui/typography";
import { Block } from "baseui/block";
import { ButtonGroup, MODE, SIZE } from "baseui/button-group";
import { Button } from "baseui/button";
import { ALIGN, Radio, RadioGroup } from "baseui/radio";
import { useCallback, useMemo, useState } from "react";
import { games, texts } from "../config";

export function Menu({ onDone }) {
  const [gameMode, setGameMode] = useState("medium");
  const [gameType, setGameType] = useState("quiz");

  const modes = useMemo(() => texts(games[gameType]), [gameType]);

  const handleSubmit = useCallback(() => {
    onDone(games[gameType][gameMode]);
  }, [onDone, gameType, gameMode]);

  return (
    <>
      <H1>Кириллица Квест</H1>
      <Paragraph2>
        Это игра где проверяются ваши навыки преобразования имени в транслит.
        Вам нужно выбрать правильный вариант, правильный не только в плане
        преобразования, но и в порядке написания. Все данные взяты с нашего
        гитлаба. Имена русские взяты из слака, имена в транслите взяты из
        гитлаба. Будьте осторожны!
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
  );
}
