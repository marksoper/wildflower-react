

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
  inputType: "number"
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
    return {value: this.props.initialValue };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
    renderMain();
  },

  render: function() {
    var options = [];
    this.props.values.forEach(function(val, index) {
      options.push(React.createElement("option", { value: index, key: index}, val));
    });
    return React.createElement(
      "select",
      { 
        value: this.state.value,
        onChange: this.handleChange
      },
      options
    );
  }

});

//
// Main
//

var renderMain = function() {
  React.render(
    React.createElement(StudentAgeRangeSelectComponent, {
      values: StudentAgeRange.values,
      initialValue: StudentAgeRange.defaultValueIndex
    }),
    document.getElementById('container')
  );
};

renderMain();

