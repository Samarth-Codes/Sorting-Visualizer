import React, { Component } from 'react';
import Bar from './components/Bar';
import BubbleSort from './algorithm/BubbleSort';
import SelectionSort from './algorithm/SelectionSort';
import InsertionSort from './algorithm/InsertionSort';
import './App.css';

class App extends Component {
  state = {
    array: [],
    steps: [],
    colorKey: [],
    colors: [],
    timeouts: [],
    currentStep: 0,
    count: 10,
    delay: 300,
    algorithm: 'BubbleSort'
  };

  componentDidMount() {
    this.generateElements();
  }

  handleStart = () => {
    const { steps, currentStep, delay } = this.state;
    this.clearTimeouts();
    let timeouts = [];

    for (let i = currentStep; i < steps.length; i++) {
      let timeout = setTimeout(() => {
        this.setState({
          array: steps[i].arr,
          colorKey: steps[i].colorKey,
          currentStep: i + 1,
        });
      }, delay * (i - currentStep));
      timeouts.push(timeout);
    }

    this.setState({ timeouts });
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = [];

    if (this.state.algorithm === 'BubbleSort') {
      BubbleSort(array, 0, steps, []);
    } else if (this.state.algorithm === 'SelectionSort') {
      SelectionSort(array, 0, steps, []);
    } else if (this.state.algorithm === 'InsertionSort') {
      steps = InsertionSort(array);
    }

    this.setState({ steps });
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  clearTimeouts = () => {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
    this.setState({ timeouts: [] });
  }

  clearColorKey = () => {
    let blank = new Array(this.state.count).fill(0);
    this.setState({ colorKey: blank, colors: [blank] });
  }

  generateElements = () => {
    let count = this.state.count;
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(this.generateRandomNumber(50, 200));
    }

    this.setState({
      array: arr,
      steps: [arr],
      count: count,
      currentStep: 0
    }, () => this.generateSteps());
  };

  changeArray = (index, value) => {
    let array = this.state.array;
    array[index] = value;
    this.setState({
      array: array,
      steps: [array],
      currentStep: 0
    }, () => this.generateSteps());
  }

  handleAlgorithmChange = (event) => {
    this.setState({ algorithm: event.target.value }, () => this.generateSteps());
  }

  render() {
    const bars = this.state.array.map((value, index) => {
      return <Bar key={index} index={index} length={value} colorKey={this.state.colorKey[index]} changeArray={this.changeArray} />;
    });

    return (
      <div className="app">
        <div className="frame">
          <div className="card container">{bars}</div>
        </div>
        <div>
          <label>
            Choose Algorithm:
            <select value={this.state.algorithm} onChange={this.handleAlgorithmChange}>
              <option value="BubbleSort">Bubble Sort</option>
              <option value="SelectionSort">Selection Sort</option>
              <option value="InsertionSort">Insertion Sort</option>
            </select>
          </label>
        </div>
        <button onClick={this.handleStart}>Start</button>
      </div>
    );
  }
}

export default App;
