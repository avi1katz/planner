import React, { Component } from 'react';
import Schedule from './Schedule';
import AddTask from './AddTask';

class TodoArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks:
      [{
        key: 1,
        startTime: '06:00',
        activity: 'Run!',
        completed: false
      },
      {
        key: 2,
        startTime: '07:00',
        activity: 'Eat Oatmeal',
        completed: false
      },
      {
        key: 3,
        startTime: '07:30',
        activity: 'Shower',
        completed: false
      }],
      taskCount: 3
    };
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
    this.onDelButtonClicked = this.onDelButtonClicked.bind(this);
    this.onRowClicked = this.onRowClicked.bind(this);
  }
  onAddButtonClicked(startTime, activity) {
    let taskCount = this.state.taskCount+1;
    this.setState({tasks: [...this.state.tasks, {key: taskCount, startTime, activity, completed: false}], taskCount});
  }

  onDelButtonClicked(key) {
    console.log(`delete button clicked: ${key}`)
    let newTasks = this.state.tasks.filter((task) => {
      console.log(`task.key: ${task.key} myBadKey: ${key} compare: ${task.key === key}`);
      return parseInt(task.key, 10) !== parseInt(key, 10);
    });
    console.log(newTasks);
    this.setState({tasks: newTasks});
  }

  onRowClicked(key) {
    console.log(`row clicked: ${key}`)
    let newTasks = this.state.tasks.map((task) => {
      console.log(`task.key: ${task.key}`);
      const newTask = task;
      task.completed = (parseInt(newTask.key, 10) === parseInt(key, 10) ? !task.completed : task.completed);
      return newTask;
    });
    console.log(newTasks);
    this.setState({tasks: newTasks});
  }

  render() {
    return (
      <div className="TodoArea container">
        <div className="row align-items-center justify-content-end py-5">
          <div className="col-12">
            <Schedule tasks={this.state.tasks}
              onDelButtonClicked={this.onDelButtonClicked}
              onRowClicked={this.onRowClicked}/>
            <AddTask onAddButtonClicked={this.onAddButtonClicked}/>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoArea;
