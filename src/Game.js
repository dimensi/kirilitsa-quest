import { questions } from "./questions";
import { RadialProgress } from "react-radial-progress-indicator";
import { Block } from "baseui/block";
import { Paragraph1 } from "baseui/typography";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";
import { ArrowRight } from "baseui/icon";
import { useQuiz } from "./useQuiz";
import {useEffect, useRef, useState} from "react";
import {Input, StatefulInput} from "baseui/input";

export function Game({ gameMode: { totalQuestions, time, inputMode }, onDone }) {
  const { result, setAnswer, question, skipQuestion } = useQuiz(questions, {
    totalQuestions,
  });

  useEffect(() => {
    if (result) {
      onDone(result);
    }
  }, [onDone, result]);

  const timer = useRef(null);
  useEffect(() => {
    timer.current = setTimeout(skipQuestion, time * 1e3);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [skipQuestion, time]);

  const [value, setValue] = useState('')
  return (
    <Block>
      <FlexGrid flexGridColumnCount={2} alignItems={"center"}>
        <FlexGridItem>
          <Paragraph1>{question.question} это —</Paragraph1>
        </FlexGridItem>
        <FlexGridItem justifyContent={"right"} display={"flex"}>
          <RadialProgress
            key={question.question}
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
            text={(steps, percentage) =>
              (Math.floor(steps * percentage * 10) / 10).toFixed(1)
            }
            width={50}
          />
        </FlexGridItem>
      </FlexGrid>
        {!inputMode && (
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
                {question.variants.map((variant) => (
                    <Button
                        key={variant}
                        startEnhancer={() => <ArrowRight size={24} />}
                        onClick={() => setAnswer(variant)}
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
        )}
      {inputMode && (
          <form onSubmit={(e) => {
            e.preventDefault();
            setAnswer(value)
            setValue('')
          }}>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Введите ответ на translite"
                clearOnEscape
            />
          </form>
      )}
    </Block>
  );
}
