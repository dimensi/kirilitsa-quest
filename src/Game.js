import {useMemo, useState} from "react";
import {questions} from "./questions";
import {shuffle} from "lodash";
import {useList} from "react-use";
import {RadialProgress} from "react-radial-progress-indicator";
import {Block} from "baseui/block";
import {Paragraph1} from "baseui/typography";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {ButtonGroup} from "baseui/button-group";
import {Button} from "baseui/button";
import {ArrowRight} from "baseui/icon";

const prepareAnswers = (questions, answers) =>
  questions.map(({ question }, idx) => ({ question, answer: answers[idx] }));

export function Game({ gameMode: { totalQuestions, time }, onDone }) {
  const items = useMemo(
    () =>
      [questions[0]].concat(shuffle(questions.slice(1, totalQuestions))),
    [totalQuestions]
  );
  const [currentIndex, setNextIndex] = useState(0);
  const [answers, answersApi] = useList([]);
  const currentQuestion = items[currentIndex]
  const handleAnswer = (answer) => {
    answersApi.push(answer);
    if (currentIndex === totalQuestions - 1) {
      onDone(prepareAnswers(items, answers.concat(answer)));
    } else {
      setNextIndex(prev => prev + 1);
    }
  };

  const handleTimeout = (percentage) => {
    if (percentage === 0) {
      handleAnswer("");
    }
  };

  return (
    <Block>
      <FlexGrid flexGridColumnCount={2} alignItems={"center"}>
        <FlexGridItem>
          <Paragraph1>{currentQuestion.question} это —</Paragraph1>
        </FlexGridItem>
        <FlexGridItem justifyContent={"right"} display={"flex"}>
          <RadialProgress
              key={currentQuestion.question}
              backgroundColour="#dff0d8"
              backgroundTransparent
              duration={time * 1e3}
              fontRatio={4}
              height={50}
              ringBgColour="#ccc"
              ringFgColour="#666666"
              ringIntermediateColour="#666666"
              ringThickness={0.2}
              segmented={false}
              showIntermediateProgress
              step={0}
              steps={time}
              startStep={time}
              text={(steps, percentage) => {
                handleTimeout(percentage);
                return (Math.floor(steps * percentage * 10) / 10).toFixed(1);
              }}
              width={50}
          />
        </FlexGridItem>
      </FlexGrid>
      <ButtonGroup
        overrides={{
          Root: {
            style: () => ({
              flexDirection: "column",
              maxWidth: "350px",
              rowGap: "10px",
            }),
          },
        }}
      >
        {currentQuestion.variants.map((variant) => (
          <Button
            key={variant}
            startEnhancer={() => <ArrowRight size={24} />}
            onClick={() => handleAnswer(variant)}
            overrides={{
              BaseButton: {
                style: () => ({ justifyContent: "flex-start" }),
              },
            }}
          >
            {variant}
          </Button>
        ))}
      </ButtonGroup>
    </Block>
  );
}
