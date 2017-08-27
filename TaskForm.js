import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Modal,
  Button,
  Picker,
  Slider,
  DatePickerAndroid,
  Alert
} from 'react-native';
var marg = 5

export class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      canSubmit: [false, false],
      newTask: {
        label: '',
        subtitle: '',
        description: '',
        dueDate: '',
        reminderDate: '',
        subject: {},
        priority: 1,
        //daysFromNow: this.getDaysFromNow(), //WILL DEFINITELY CAUSE PROBLEMS
        //defaultSortIndex: Math.pow(1.5, this.state.newTask.priority) / this.state.newTask.daysFromNow
      },
    };
  }
  getDaysFromNow() {
    return Math.round(
      Math.abs(
        (new Date().getTime() - this.state.newTask.dueDate.getTime()) / (24 * 60 * 60 * 1000)
      ) // hours*minutes*seconds*milliseconds = full unix day
    );
  }
  showForm(visible) {
    this.setState({ isShown: visible });
  }
  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.isShown}
          onRequestClose={() => {
            this.setState({ isShown: false });
          }}
        >
        {/*this view is the shadowed window behind the popup*/}
          <View
            backgroundColor={'rgba(0, 0, 0, 0.4)'}
            height={'100%'}
            justifyContent="flex-start"
            alignItems="center"
            paddingVertical={30}
          >
          {/*the popup itself, this view disctates the size and color*/}
            <View
              backgroundColor={'white'}
              height={350}
              width={'75%'}
              
            >
            {/*this view dictates the alignment of the title*/}
               <View
               fontSize={60}
                height={60}
                justifyContent="flex-start"
                alignItems="center"
                >
                <Text>New Task</Text>
              </View> 
              {/*this view dictates the alignment of the inputs*/}
              <View
                justifyContent="center"
                alignItems="flex-start">

              <TextInput
                style={formStyles.textInput}
                placeholder={'Title'}
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

              <Slider
                width="50%"
                step={1}
                maximumValue={10}
                minimumValue={0}
                marginVertical = {5}
                onValueChange={priority =>
                  this.setState({
                    newTask: { ...this.state.newTask, priority: priority },
                  })}
              /> 
              
              <Button title="Due Date" onPress={async () => {try {
                var {action, year, month, day} = await DatePickerAndroid.open({
                  minDate: new Date(),
                  date: new Date()
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                  this.setState({canSubmit: [true, this.state.canSubmit[1]], newTask: { ...this.state.newTask, dueDate: new Date(year, month, day) }})
                
                }
              } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
              }}}></Button>

              <View width={'50%'}>
                <Picker
                marginVertical = {5}
                  mode="dropdown"
                  alignItems={'center'}
                  selectedValue={"Select"}
                  onValueChange={(itemValue, itemIndex) =>{
                    if(itemValue){
                      this.setState({
                      newTask: { ...this.state.newTask, subject: itemValue }, canSubmit: [this.state.canSubmit[0], true]
                    })}
                  
                  }
                    
                  
                    }
                >
                {/* {this.props.subjectList.map( subject => <Picker.Item label={subject.name} value={subject} key={j=(j+1)}/>)} */}
                <Picker.Item label="-Subject-" value={false} />
                <Picker.Item label="Methods" value={{name: "Methods", col: "red"}} />
                <Picker.Item label="Software Dev" value={{name: "Software Dev", col: "blue"}} />
                <Picker.Item label="Literature" value={{name: "Literature", col: "green"}} />
                <Picker.Item label="English" value={{name: "English", col: "yellow"}} />
                <Picker.Item label="Misc" value={{name: "Misc", col: "#efefef"}} />
                
                </Picker>
              </View>
              <Button 
              
                justifyContent="flex-start"
                title="Submission Button"
                onPress={() => {
                  if(this.state.canSubmit[0] && this.state.canSubmit[1]){
                  this.props.onAddNewTask(this.state.newTask);
                  this.showForm(!this.state.isShown);
                  this.setState({
                    canSubmit: [false, false], newTask: { label: '', subtitle: '', description: '', subject: {}, defaultSortIndex: 1, daysFromNow: ''},
                  });
                }else{Alert.alert('Invalid Data', 'Please add a valid due date and subject', [{text: 'OK'}])}
                }}
              />
            </View>
            {/* <View 
              justifyContent="center"
              alignItems="flex-end">
              <Text>Right hand side</Text>
            </View> */}

            </View>
          </View>
        </Modal>

        <Button
          title="New Task"
          onPress={() => {
            this.showForm(true);
          }}
        />
      </View>
    );
  }
}


const formStyles = StyleSheet.create({
  textInput: {
    width: '40%',
    borderColor: '#000',
    marginVertical: 5,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
});
