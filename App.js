import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Keyboard,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Task, taskStyle } from './Task.js';
import { TaskForm } from './TaskForm.js';

// cd C:\Users\Sam\Desktop\Projects\hReminder
var taskKey = 1;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkDeletion = this.checkDeletion.bind(this);
    this.state = {
      tasks: [],
    };
  }
  //Adds a new task to the tasks array in state, method of communcation between TaskForm and App
  onAddNewTask = task => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };
  //Compares the key values of the selected Task in the list, deletes it task from the tasks array
  checkDeletion(key) {
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (key === this.state.tasks[i].key) {
        this.setState({
          tasks: this.state.tasks.splice(i, 1),
        });

        this.setState({
          tasks: this.state.tasks,
        });
      }
    }
  }

  render() {
    return (
      <View>
        <View style={styles.header} padding={40}>
          <Text style={styles.test}> hReminder </Text>
        </View>
        {/*instance of new task form, passing the onAddNewTask function from the parent*/}

        <TaskForm onAddNewTask={this.onAddNewTask} testFunc={this.testFunc} />

        {/*ScrollView allows for infinite scrolling as more components are added*/}
        <ScrollView>
          <View style={{ flexDirection: 'column', height: '90%', padding: 20 }}>
            {/*Sorts the tasks based on a combination of their priority and due date*/}
            {sortTasksDefault(this.state.tasks)}
            {/*Creates a new Task component for each item in tasks, passing through the task as props*/}
            {this.state.tasks.map(task => {
              return (
                <Task
                  newTask={task}
                  key={(taskKey = taskKey + 1)}
                  checkDeletion={this.checkDeletion}
                  testFunc={this.testFunc}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
//Sorts functions based on their 'defaultSortIndex', from highest to lowest
function sortTasksDefault(tasks) {
  let length = tasks.length;
  for (let i = 0; i < length - 1; i++) {
    let max = i;
    for (let j = i + 1; j < length; j++) {
      if (
        Task.getDefaultSortIndex(tasks[j]) >
        Task.getDefaultSortIndex(tasks[max])
      ) {
        max = j;
      }
    }
    if (max != i) {
      let tmp = tasks[i];
      tasks[i] = tasks[max];
      tasks[max] = tmp;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFD801',
    justifyContent: 'center',
    height: '10%',
  },
  test: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FF00FF',
  },
});
