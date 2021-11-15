import { questions } from "./questions";

export default function handler(req, res) {
  if (!Array.isArray(req.body)) {
    res.status(400).body("Wrong type");
    return;
  }

  const result = req.body.filter(({ question, answer }) => {
    const quest = questions.find((item) => item.question === question);
    if (!quest) return false;
    return quest.answer === answer;
  });

  res.status(200).json({
    total: req.body.length,
    right: result.length,
  });
}
