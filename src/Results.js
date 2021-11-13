import { useAsync } from "react-use";
import axios from "axios";
import { Block } from "baseui/block";
import { H3, Paragraph1 } from "baseui/typography";
import { StyledSpinnerNext } from "baseui/spinner";
import { ProgressBar } from "baseui/progress-bar";

export function Results({ answers }) {
  const { loading, value } = useAsync(async () => {
    const { data } = await axios.post("/api/check", answers);
    return data;
  });

  if (loading) {
    return (
      <Block display="flex" alignItems={"center"}>
        <StyledSpinnerNext $as="span" />{" "}
        <Paragraph1 marginLeft="scale400">Ван момент плиз!</Paragraph1>
      </Block>
    );
  }
  if (value.right === 0) {
    return (
      <Block>
        <H3>Поздравляю!</H3>
        <Paragraph1>
          Вам нужна помощь также как и мне. Проголосуйте за кириллицу в гитлабе!
        </Paragraph1>
      </Block>
    );
  }

  if (value.right === value.total) {
    return (
      <Block>
        <H3>Поздравляю!</H3>
        <Paragraph1>
          Вы уговорили меня, вам не нужна кириллица в гитлабе!
        </Paragraph1>
      </Block>
    );
  }
  return (
    <Block>
      <H3>{value.right}</H3>
      <Paragraph1>
        {value.right} из {value.total} правильных ответов
      </Paragraph1>
      <ProgressBar
        successValue={(value.total / value.right) * 100}
        value={100}
      />
    </Block>
  );
}
