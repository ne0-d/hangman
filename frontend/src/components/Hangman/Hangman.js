import React, { Component, useEffect, useState } from "react";
import { randomWord } from "./words";
import * as AuthApi from "../../AuthRequests";

import step0 from "../images/0.jpg";
import step1 from "../images/1.jpg";
import step2 from "../images/2.jpg";
import step3 from "../images/3.jpg";
import step4 from "../images/4.jpg";
import step5 from "../images/5.jpg";
import step6 from "../images/6.jpg";

let gameStat;
let user = JSON.parse(localStorage.getItem('userh'))

class Hangman extends Component {
 
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };

  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.keyPress = this.keyPress.bind(this);
    window.addEventListener("keydown", this.keyPress);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((bingo) => (this.state.guessed.has(bingo) ? bingo : "_"));
  }

  handleGuess(value) {
    let letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  keyPress(event) {
    /**
     * 8 = backspace
     * 13 = enter
     * 32 = space
     * 65 = A (Capital)
     * 90 = Z (Capital)
     * 97 = a (Small)
     * 122 = z (Small)
     */
    if (gameStat === "CONGRATS! YOU SAVED HIM!" || gameStat === "YOUR MISTAKE CAUSED HIM DEATH :(") {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
        this.resetButton();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      this.handleGuess(event.key);
    } else if (
      event.keyCode === 8 ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      this.resetButton();
    } else {
    }
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={(e) => this.handleGuess(e.target.value)}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };
  updateScore = async () => {
    const response = await AuthApi.updateScore({ username: user.user.username, score: Number(user.user.userScore) });
    
    console.log(response)
  };
  decreaseScore = async () => {
    const response = await AuthApi.updateScore({ username: user.user.username, score: Number(user.user.userScore) });
    
    console.log(response)
  };


  render() {
    const { mistake, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === answer;
    gameStat = this.generateButtons();


    if (isWinner) {
      gameStat = "CONGRATS! YOU SAVED HIM!";
      user.user.userScore = Number(user.user.userScore) + 50;
    localStorage.setItem('userh', JSON.stringify(user));
      this.updateScore()

    }
    if (gameOver) {
      gameStat = "YOUR MISTAKE CAUSED HIM DEATH :(";
      user.user.userScore = Number(user.user.userScore) - 20;
    localStorage.setItem('userh', JSON.stringify(user));
      this.decreaseScore()
    }

    return (
      <div className="Hangman">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand text-light" href="/">
            Hangman. <small>Do (or) Die</small>
          </a>
          <span className="d-xl-none d-lg-none text-primary">
            Guessed wrong: {mistake}
          </span>
          <button
            className="navbar-toggler sr-only"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item "></li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
            </ul>
            <span className="navbar-text text-primary">
              Your Score: {user.user.userScore}
            </span>
          </div>
        </nav>
        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          Guess the Programming Language ?
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : answer}{" "}
        </p>

        <div className="keyboard">
          <p className="text-center text-warning mt-4 ">{gameStat}</p>
        </div>

        <div>
          <p className="text-center">
            <button className="Hangman-reset" onClick={this.resetButton}>
              Reset
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Hangman;