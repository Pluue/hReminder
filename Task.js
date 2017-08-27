import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class Task extends React.Component {
  constructor(props) {
    super(props);
  }
  static getDefaultSortIndex(task) {
    return Math.pow(1.5, task.priority) / Task.getDaysFromNow(task.dueDate);
  }
  static getDaysFromNow(date) {
    return Math.round(
      Math.abs((new Date().getTime() - date.getTime()) / (24 * 60 * 60 * 1000)) // hours*minutes*seconds*milliseconds = full unix day
    );
  }
  toUseableDate() {
    return this.props.newTask.dueDate
      .toString()
      .split('')
      .slice(0, 11)
      .join('')
      .toString();
  }

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: this.props.newTask.subject.col,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 6,
          }}
        >
          <Text>
            {this.props.newTask.label}
          </Text>
          <Text>
            {this.props.newTask.subtitle}
          </Text>
          <Text>
            {this.props.newTask.description}
          </Text>
          <Text>
            {this.props.newTask.subject.name}
          </Text>
          <Text>
            {this.toUseableDate()}{' '}
            {Task.getDaysFromNow(this.props.newTask.dueDate)} days from now
          </Text>
          <Text>
            {Task.getDefaultSortIndex(this.props.newTask)}
          </Text>
        </View>
      </View>
    );
  }
}
export const taskStyle = StyleSheet.create({
  body: {
    flex: 1,
    width: '80%',
    height: 100,
    backgroundColor: '#FF00FF',
    margin: 10,
  },
});
