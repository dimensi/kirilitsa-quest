import { useMemo, useRef, useState } from "react";
import { shuffle } from "lodash";
import { useCounter } from "react-use";

const prepareAnswers = (questions, answers) =>
  questions.map(({ question }, idx) => ({ question, answer: answers[idx] }));

export function useQuiz(questions, { totalQuestions }) {
  const items = useMemo(
    () => [questions[0]].concat(shuffle(questions.slice(1, totalQuestions))),
    [questions, totalQuestions]
  );
  const [index, { inc }] = useCounter(0, totalQuestions);
  const [result, setResult] = useState(null);
  const answers = useRef([]);
  const setAnswer = (answer) => {
    answers.current.push(answer);
    if (index === totalQuestions - 1) {
      setResult(prepareAnswers(items, answers.current));
    } else {
      inc();
    }
  };

  const skipQuestion = () => setAnswer("");

  console.log(index);
  return {
    question: items[index],
    skipQuestion,
    setAnswer,
    result,
  };
}
