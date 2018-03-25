import React, { Component } from 'react';

import Card from './components/Card';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step1: {
        step_attempted: 0,
        step_started: 0,
        step_completed: 0,
      },
    };
  }

  componentDidMount() {
    let step_attempted = 0;
    let step_started = 0;
    let step_completed = 0;
    let step_error = 0;

    fetch('https://appcues-interview.firebaseio.com/testData/05102017/events.json')
      .then((response) => response.json())
      .then((json) =>
        json.forEach((event) => {
          if (event.stepId === 'step0') {
            if (event.eventName === 'step_attempted') {
              step_attempted += 1;
            } else if (event.eventName === 'step_started') {
              step_started += 1;
            }
          } else if (event.stepId === 'step3') {
            if (event.eventName === 'step_completed') {
              step_completed += 1;
            }
          }
        })
      )
      .then(() => this.setState({ step1: { step_attempted, step_started, step_completed } }));
  }

  render() {
    return (
      <div className="App">
        <ul className="card-container">
          <Card
            title="Total Users Reached"
            description="How many targeted users landed on the URL?"
            number={this.state.step1.step_attempted}
          />
          <Card
            title="Total Users Shown"
            description="How many users were acually shown the flow?"
            number={this.state.step1.step_started}
          />
          <Card
            title="Total Completed"
            description="How many users completed every step of the flow?"
            number={this.state.step1.step_completed}
          />
          <Card
            title="Completion Rate"
            description="What portion of originally reached users completed?"
            number={`${Math.floor(
              this.state.step1.step_completed / this.state.step1.step_attempted * 100
            )}%`}
          />
        </ul>
      </div>
    );
  }
}

function getStepsData() {
  fetch('https://appcues-interview.firebaseio.com/testData/05102017/steps.json')
    .then((response) => response.json())
    .then((json) => json);
}

export default App;
