import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

var marg = 7;

/*
export class Task {
  constructor(
    title,
    subtitle,
    description,
    dueDate,
    reminder,
    subject,
    priority
  ) {
    //Create input validation that pushes the prop as 'null' if it isn't present
    //Then add 'if(prop) {input} else {default}' to the constructor.
    //Try pushing the state of the input component as a new Task.
    //That way you can have defaults incase no input is supplied.
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.dueDate = new Date( //[year, month, day]
      dueDate[0].toString(),
      dueDate[1].toString(),
      dueDate[2].toString()
    );
    this.reminderDate = new Date( //[year, month, day, hour, minute, second, millisecond]
      reminder[0].toString(),
      reminder[1].toString(),
      reminder[2].toString(),
      reminder[3].toString(),
      reminder[4].toString(),
      reminder[5].toString(),
      reminder[6].toString()
    );
    this.subject = subject; //[name, color]
    this.priority = priority; //int
    this.defaultSortIndex = Math.pow(1.5, this.priority) / this.daysFromNow;
    this.daysFromNow = this.getDaysFromNow(this.dueDate);
  }

  //determines the amount of days between two dates
  getDaysFromNow() {
    return Math.round(
      Math.abs(
        (new Date().getTime() - this.dueDate.getTime()) / (24 * 60 * 60 * 1000)
      ) // hours*minutes*seconds*milliseconds = full unix day
    );
  }
  toUseableDate() {
    return this.dueDate.toString().split('').slice(0, 15).join('').toString();
  }
} */

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.title = '';
    this.state.subtitle = '';
    this.state.description = '';
    this.state.dueDate = new Date();
    // dueDate[0].toString(),
    // dueDate[1].toString(),
    // dueDate[2].toString()
    this.state.reminderDate = false;
    this.state.subject = ['', '#efefef'];
    this.state.priority = 5;
    this.state.defaultSortIndex =
      Math.pow(1.5, this.state.priority) / this.state.dueDate;
    this.state.daysFromNow = this.getDaysFromNow(this.state.dueDate);
  }

  getDaysFromNow() {
    return Math.round(
      Math.abs(
        (new Date().getTime() - this.state.dueDate.getTime()) /
          (24 * 60 * 60 * 1000)
      ) // hours*minutes*seconds*milliseconds = full unix day
    );
  }
  toUseableDate() {
    return this.dueDate.toString().split('').slice(0, 15).join('').toString();
  }
  /*setProps(
    title,
    subtitle,
    description,
    dueDate,
    reminderDate,
    subject,
    priority
  ) {
    this.setState({ title: title });
    this.setState({ dueDate: dueDate });
    if(subtitle){
      this.setState({ subtitle: subtitle })
    }
  }*/

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: this.state.subject[1],
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: marg,
          }}
        >
          <Text>
            {this.props.title}
          </Text>
          <Text>
            {this.props.subtitle}
          </Text>
          <Text>
            {this.props.description}
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
