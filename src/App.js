import React, { Component } from "react";
import "./App.css";
import Timekeeper from "react-timekeeper";

const PERIODIC = [3, 4, 5, 6];
class App extends Component {
  state = {
    sleepTime: "",
    sleepTimeResults: [],
    wakeupTime: "",
    wakeupTimeResults: [],
    displaySleepTimePicker: false,
    displayWakeupTimePicker: false
  };

  componentDidMount() {
    const sleepTime = new Date();
    this.setState({
      sleepTime: sleepTime.toTimeString().slice(0, 5)
    });
    this.calculateWakeupTime(sleepTime);
  }

  calculateWakeupTime = time => {
    let times = [];

    PERIODIC.forEach(per => {
      let wakeup = new Date(time);
      wakeup.setTime(wakeup.getTime() + per * (90 * 60 * 1000));
      times.push(wakeup.toTimeString().slice(0, 5));
    });

    this.setState({
      wakeupTime: times[3] || "",
      wakeupTimeResults: times
    });
  };

  calculateSleepTime = time => {
    let times = [];

    PERIODIC.forEach(per => {
      let sleep = new Date(time);
      sleep.setTime(sleep.getTime() - per * (90 * 60 * 1000));
      times.push(sleep.toTimeString().slice(0, 5));
    });

    this.setState({
      sleepTime: times[3] || "",
      sleepTimeResults: times
    });
  };

  handleSleepTimeChange = time => {
    const { hour24, minute } = time;
    this.setState({
      sleepTime: `${hour24}:${minute}`
    });
  };

  handleWakeupTimeChange = time => {
    const { hour24, minute } = time;
    this.setState({
      wakeupTime: `${hour24}:${minute}`
    });
  };

  handlePickSleepTime = time => {
    const { hour24, minute } = time;
    const pickTime = new Date();
    pickTime.setHours(hour24);
    pickTime.setMinutes(minute);

    this.setState({ displaySleepTimePicker: false, sleepTimeResults: [] });
    this.calculateWakeupTime(pickTime);
  };

  handlePickWakeupTime = time => {
    const { hour24, minute } = time;
    const pickTime = new Date();
    pickTime.setHours(hour24);
    pickTime.setMinutes(minute);

    this.setState({ displayWakeupTimePicker: false, wakeupTimeResults: [] });
    this.calculateSleepTime(pickTime);
  };

  render() {
    const {
      displaySleepTimePicker,
      displayWakeupTimePicker,
      sleepTime,
      wakeupTime,
      sleepTimeResults,
      wakeupTimeResults
    } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <div className="about-app">
            <div className="app-name">Good Sleep</div>
            <div className="app-author">Quang Son Nguyen</div>
          </div>
          <div className="time-container">
            <div className="time-header">
              <div className="time-title">Sleep Time</div>
              <div className="show-picker">
                <button
                  className="btn"
                  onClick={() =>
                    this.setState({ displaySleepTimePicker: true })
                  }
                >
                  Pick time
                </button>
              </div>
            </div>
            <div className="time-metric">{sleepTime}</div>
            {sleepTimeResults && sleepTimeResults.length > 0 && (
              <div className="time-result">
                {sleepTimeResults.map(x => (
                  <div key={x} className="time-result-item">
                    {x}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="time-container">
            <div className="time-header">
              <div className="time-title">Wakeup Time</div>
              <div className="show-picker">
                <button
                  className="btn"
                  onClick={() =>
                    this.setState({ displayWakeupTimePicker: true })
                  }
                >
                  Pick time
                </button>
              </div>
            </div>
            <div className="time-metric">{wakeupTime}</div>
            {wakeupTimeResults && wakeupTimeResults.length > 0 && (
              <div className="time-result">
                {wakeupTimeResults.map(x => (
                  <div key={x} className="time-result-item">
                    {x}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {displaySleepTimePicker && (
          <div className="time-picker-box">
            <Timekeeper
              time={sleepTime}
              switchToMinuteOnHourSelect={true}
              onChange={this.handleSleepTimeChange}
              onDoneClick={this.handlePickSleepTime}
            />
          </div>
        )}
        {displayWakeupTimePicker && (
          <div className="time-picker-box">
            <Timekeeper
              time={wakeupTime}
              switchToMinuteOnHourSelect={true}
              onChange={this.handleWakeupTimeChange}
              onDoneClick={this.handlePickWakeupTime}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
