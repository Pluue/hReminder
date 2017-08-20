import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Button,
} from 'react-native';
import { taskList } from './App.js';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      newTask: {
        label: '',
        subtitle: '',
        description: '',
        dueDate: '',
        reminderDate: '',
        subject: '',
        priority: '',
      },
    };
  }
  showForm(visible) {
    this.setState({ isShown: visible });
  }
  render() {
    return (
      <View backgroundColor={'green'}>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.isShown}
          onRequestClose={() => {
            this.setState({ isShown: false });
          }}
        >
          <View
            backgroundColor={'rgba(0, 0, 0, 0.4)'}
            height={'100%'}
            justifyContent="center"
            alignItems="center"
          >
            <View
              backgroundColor={'white'}
              height={'75%'}
              width={'75%'}
              justifyContent="center"
              alignItems="flex-start"
            >
              <TextInput
                style={formStyles.textInput}
                palceholder={'Title'}
                value={this.state.newTask.label}
                onChangeText={text =>
                  this.setState({
                    newTask: { ...this.state.newTask, label: text },
                  })}
              />
              <TextInput
                style={formStyles.textInput}
                placeholder={'Subtitle'}
                value={this.state.newTask.subtitle}
                onChangeText={text =>
                  this.setState({
                    newTask: { ...this.state.newTask, subtitle: text },
                  })}
              />
              <TextInput
                style={formStyles.textInput}
                placeholder={'Description'}
                value={this.state.newTask.description}
                onChangeText={text =>
                  this.setState({
                    newTask: { ...this.state.newTask, description: text },
                  })}
              />

              <Button
                title="Submission Button"
                onPress={() => {
                  taskList.push(this.state.newTask);
                  this.showForm(!this.state.isShown);
                }}
              />
            </View>
          </View>
        </Modal>

        <Button
          title="New Task Button"
          onPress={() => {
            this.showForm(true);
          }}
        />
      </View>
    );
  }
}

export const formStyles = StyleSheet.create({
  textInput: {
    width: '40%',
    borderColor: '#000',
    paddingHorizontal: 1,
    paddingVertical: 2,
  },
});
