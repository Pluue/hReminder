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
import { TaskForm, formStyle } from './TaskForm.js';

// cd C:\Users\Sam\Desktop\Projects\hReminder
var i = 1;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskTitle: '',
      tasks: [],
    };
  }
  render() {
    return (
      <View>
        <View style={styles.header} padding={40}>
          <Text style={styles.test}> hReminder </Text>
        </View>
        <TaskForm />
        {/* <View>
          <TextInput
            value={this.state.newTaskTitle}
            onChangeText={text => this.setState({ newTaskTitle: text })}
          />
          <Button
            title={'Title'}
            onPress={() => {
              this.setState({
                tasks: [...this.state.tasks, this.state.newTaskTitle],
                newTaskTitle: '',
              });
              Keyboard.dismiss();
            }}
          >
            Add Task
          </Button>
        </View> */}
        <ScrollView>
          <View
            style={{ flexDirection: 'column', height: '100%', padding: 20 }}
          >
            {taskList.map(task =>
              <Task
                title={task.label}
                subtitle={task.subtitle}
                description={task.description}
                key={(i = i + 1)}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export var taskList = [];

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
