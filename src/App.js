import './App.css';
import { Block } from 'baseui/block'
import{ questions } from './questions'
import { shuffle } from 'lodash';

const gameSettings = {
  easy: {
    totalQuestions: 10,
    time: 10
  },
  medium: {
    totalQuestions: 20,
    time: 5
  },
  hard: {
    totalQuestions: Infinity,
    time: 3,
  },
}


function App() {
  
  return (
    <Block>
      hi
    </Block>
  );
}

export default App;
