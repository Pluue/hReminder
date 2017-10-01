import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletion: false,
    };
  }
  //Calculates the number with which the task will be sorted.
  //Based on combination of daysFromNow and priority
  static getDefaultSortIndex(task) {
    return Math.pow(1.5, task.priority) / Task.getDaysFromNow(task.dueDate);
  }
  //Calculates the amount of days between the current date and a selected date
  static getDaysFromNow(date) {
    return Math.round(
      Math.abs((new Date().getTime() - date.getTime()) / (24 * 60 * 60 * 1000)) // hours*minutes*seconds*milliseconds = full unix day
    );
  }
  //Puts the dueDate into a readable format
  toUseableDate() {
    return this.props.newTask.dueDate
      .toString()
      .split('')
      .slice(0, 10)
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
          <Button
            title="Delete"
            onPress={() => {
              this.props.checkDeletion(this.props.newTask.key);
            }}
          />

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
            {this.toUseableDate()}
            {', '}
            {Task.getDaysFromNow(this.props.newTask.dueDate)} days from now
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
