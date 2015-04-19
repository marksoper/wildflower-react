

//
// Data Model
//

var User;

var State = {
  type: "String",
  values: ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
  inputType: "select"
};

var Paths = {
  type: "String",
  values: [
    "Teacher/credentials required for a given student age range and number of students",
    "Number of students possible for given teacher/credentials and student age range"
  ],
  inputType: "navigation"
};

var StudentAgeRange = {
  type: "String",
  values: [
    "0-3",
    "3-6",
    "6-9",
    "9-12",
    "12-15"
  ],
  defaultValueIndex: 0,
  inputType: "select"
};

var NumberOfStudents = {
  type: "Integer",
  inputType: "number",
  min: 1,
  max: 40,
  step: 1,
  defaultValue: 10
};

var DataModel = {
  User: User,
  State: State,
  Paths: Paths,
  StudentAgeRange: StudentAgeRange,
  NumberOfStudents: NumberOfStudents
};


//
// UI
//

var StudentAgeRangeSelectComponent = React.createClass({

  getInitialState: function() {
    return {value: this.props.defaultValue };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render: function() {
    var options = [];
    this.props.values.forEach(function(val, index) {
      options.push(React.createElement("option", {
        value: index,
        key: index
      }, val));
    });
    var select = React.createElement(
      "select",
      { 
        key: "studentAgeSelect",
        id: "studentAgeSelect",
        value: this.state.value,
        onChange: this.handleChange
      },
      options
    );
    var label = React.createElement(
      "div",
      {
        key: "studentAgeSelectLabelContainer"
      },
      React.createElement(
        "label",
        {
          htmlFor: select.key,
          key: "studentAgeSelectLabel"
        },
        "Student Age"
      )
    );
    return React.createElement(
      "div",
      {
        key: "studentAgeSelectContainer"
      },
      [label, select]
    );
  }

});


var StudentCountSliderComponent = React.createClass({

  getInitialState: function() {
    return { value: this.props.defaultValue };
  },

  handleInput: function(event) {
    if (this.state.value === event.target.value) return;
    console.log("slider handleInput from: " + this.state.value + " to: " + event.target.value);
    this.setState({value: event.target.value});
  },

  handleChange: function(event) {
    var origDataValue = this.props.dataValue;
    if (this.state.value !== event.target.value) {
      console.log("unexpected");
      this.setState({value: event.target.value});
      this.props.dataValue = event.target.value;
    } else {
      this.props.dataValue = this.state.value;
    }
    console.log("slider handleChange from: " + origDataValue + " to: " + this.props.dataValue);
  },

  render: function() {
    var input = React.createElement(
      "input",
      {
        key: "studentCountInput",
        id: "studentCountInput",
        type: "range",
        min: this.props.min,
        max: this.props.max,
        step: this.props.step,
        onInput: this.handleInput,
        onChange: this.handleChange,
        value: this.state.value
      }
    );

    var label = React.createElement(
      "div",
      {
        key: "studentCountLabelContainer"
      },
      React.createElement(
        "label",
        {
          htmlFor: input.key,
          key: "studentCountLabel"
        },
        "Number of Students"
      )
    );
    return React.createElement(
      "div",
      {
        key: "studentCountSliderContainer"
      },
      [label, input]
    );
  }

});

var calculateTeachersAndCredentialsFromStudentAgeAndCount = function(studentAgeRange, studentCount) {
  return "not implmented, inputs were: " + studentAgeRange + ", " + studentCount;
};

var TeacherCredentialCalculatorComponent = React.createClass({

  getInitialState: function() {
    //
    // eventually persistence comes into play here
    //
    var studentCount = NumberOfStudents.defaultValue;
    var studentAgeRange = StudentAgeRange.defaultValueIndex;
    var teachersRequired = calculateTeachersAndCredentialsFromStudentAgeAndCount(studentCount, studentAgeRange);
    return {
      studentCount: studentCount,
      studentAgeRange: studentAgeRange,
      teachersRequired: teachersRequired 
    };
  },

  render: function() {
    var studentAgeRangeSelectElement = React.createElement(
      StudentAgeRangeSelectComponent,
      {
        key: "studentAgeRangeSelect",
        values: StudentAgeRange.values,
        value: this.state.studentAgeRange
      }
    );
    var studentCountSliderElement = React.createElement(
      StudentCountSliderComponent,
      {
        key: "studentCountSlider",
        min: NumberOfStudents.min,
        max: NumberOfStudents.max,
        step: NumberOfStudents.step,
        value: this.state.studentCount
      }
    );
    return React.createElement(
      "div",
      {
        key: "teacherCredentialCalculatorComponent"
      },
      [studentAgeRangeSelectElement, studentCountSliderElement]
    );
  }

});


//
// Main
//

var data;
var renderMain = function() {
  React.render(
    React.createElement(TeacherCredentialCalculatorComponent),
    document.getElementById('container')
  );
};

renderMain();

