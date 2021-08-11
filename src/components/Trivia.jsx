import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScore, setLocalStorage } from '../redux/action';
import bicicleta from '../images/silvio-santos-triciclo.gif';
import '../css/trivia.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: [],
      time: 30,
    };

    this.changeStyles = this.changeStyles.bind(this);
    this.button = this.button.bind(this);
    this.timer = this.timer.bind(this);
    this.correctQuestion = this.correctQuestion.bind(this);
  }

  componentDidMount() {
    const { player, setPlayer } = this.props;
    setPlayer(player);
    const proxButton = document.getElementById('proxButton');
    proxButton.style.visibility = 'hidden';
    this.mountButtons();
    this.timer();
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.myInterval);
    }
  }

  componentWillUnmount() {
    const { player, setPlayer } = this.props;
    setPlayer(player);
  }

  correctQuestion() {
    this.savePoints();
    this.changeStyles();
  }

  switchNivel() {
    const { trivia } = this.props;
    const { difficulty } = trivia;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let valueDificult;
    switch (difficulty) {
    case 'easy':
      valueDificult = easy;
      break;
    case 'medium':
      valueDificult = medium;
      break;
    default:
      valueDificult = hard;
      break;
    }
    return valueDificult;
  }

  savePoints() {
    const { getPoints, player, setPlayer } = this.props;
    const { time } = this.state;
    const questionsRight = Number(player.assertions) + 1;
    const point = 10;
    const valueDificult = this.switchNivel();
    const score = (point + (time * valueDificult)) + player.score;
    const result = {
      score,
      questionsRight,
    };
    const obj = { ...player, score: result.score, assertions: result.questionsRight };
    setPlayer(obj);
    getPoints(result);
  }

  // Algoritmo de embaralhamento de Fisher–Yates, retirado de https://pt.stackoverflow.com/questions/406037/mostrar-elementos-de-um-array-em-ordem-aleat%C3%B3ria
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  changeStyles() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
      if (button.value === 'wrong') {
        button.style.border = '3px solid rgb(255, 0, 0)';
        button.disabled = true;
      } if (button.value === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
        button.disabled = true;
      }
    });
    const proxButton = document.getElementById('proxButton');
    proxButton.style.visibility = 'visible';

    clearInterval(this.myInterval);
  }

  createButtons(wrongList, answer) {
    const buttonList = wrongList.map((wrong, index) => (
      <button
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        value="wrong"
        onClick={ this.changeStyles }
      >
        {this.verficaString(wrong)}
      </button>));

    const asnwerButton = (
      <button
        key={ buttonList.length }
        data-testid="correct-answer"
        type="button"
        value="correct"
        onClick={ this.correctQuestion }
      >
        {this.verficaString(answer)}
      </button>
    );
    buttonList.push(asnwerButton);
    return buttonList;
  }

  button() {
    const { onClick } = this.props;
    return (
      <button
        className="btn-next"
        data-testid="btn-next"
        type="button"
        id="proxButton"
        onClick={ onClick }
      >
        Próxima
      </button>
    );
  }

  timer() {
    const timeout = 1000;
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, timeout);
  }

  mountButtons() {
    this.setState({
      buttons: this.renderButtons(),
    });
  }

  verficaString(str) {
    // Solução do Thiago Prado no Slack
    // link: https://trybecourse.slack.com/archives/C01T2C18DSM/p1628208310464000?thread_ts=1628191723.454400&cid=C01T2C18DSM
    const htmldecode = (str2) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = str2;
      return txt.value;
    };
    return (htmldecode(str));
  }

  renderButtons() {
    const { trivia } = this.props;
    const { correct_answer: answer, incorrect_answers: wrong } = trivia;
    const questions = this.createButtons(wrong, answer);
    const randomQuestions = this.shuffle(questions);
    return randomQuestions;
  }

  render() {
    const { trivia } = this.props;
    const { category, question, difficulty } = trivia;
    const { buttons, time } = this.state;
    return (
      <div className="trivia-body">
        <div className="time-counter">{`Time remaining: ${time}`}</div>
        <h4>{ `Dificuldade: ${difficulty}` }</h4>
        <h4 className="category-questions" data-testid="question-category">{category}</h4>
        <h3
          className="questions"
          data-testid="question-text"
        >
          {`Pergunta: ${this.verficaString(question)}`}
        </h3>
        { buttons }
        <div className="next-button">
          { this.button() }
        </div>
        <img className="bicicleta" src={ bicicleta } alt="Silvio Santos de bicicleta" />
        { (time === 0) ? this.changeStyles() : null }
      </div>
    );
  }
}

Trivia.propTypes = {
  setPlayer: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  getPoints: PropTypes.func.isRequired,
  player: PropTypes.shape({
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
  }).isRequired,
  trivia: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  getPoints: (value) => dispatch(getScore(value)),
  setPlayer: (value) => dispatch(setLocalStorage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
