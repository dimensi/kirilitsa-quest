import axios from "axios";
import { Block } from "baseui/block";
import { useState } from "react";
import { useAsync } from "react-use";
import { Game } from "./components/Game";
import { Results } from "./components/Results";
import { Container } from "./components/Container";
import { Menu } from "./components/Menu";

function App() {
  const { value: questions } = useAsync(() => {
    return axios.get("/api/questions").then((r) => r.data);
  }, []);

  const [gameSettings, setGameSettings] = useState(null);
  const [answers, setAnswers] = useState(null);

  return (
    <Container>
      <Block
        backgroundColor="backgroundSecondary"
        padding="scale800"
        width={"600px"}
      >
        {!gameSettings && <Menu onDone={setGameSettings} />}
        {gameSettings && !answers && (
          <Game
            gameMode={gameSettings}
            onDone={setAnswers}
            questions={questions}
          />
        )}
        {answers && <Results answers={answers} />}
      </Block>
    </Container>
  );
}

export default App;
