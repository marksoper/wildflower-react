

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
// UI Generators
//

var generateSelectUI = function(selectModel) {
  var ui = '<select value="' + selectModel.values[selectModel.defaultValueIndex] + '">\n';
    selectModel.values.forEach(function(val) {
      ui += '<option value="' + val + '">' + val + "</option>\n";
    });
  ui += "</select>";
  console.log(ui);
  return ui;
};

//
// React
//

var App = React.createClass({
  render: function() {
    var studentAgeRangeSelect = generateSelectUI(StudentAgeRange);
    return React.DOM.p(null, studentAgeRangeSelect);
  }
});

var AppFactory = React.createFactory(App);

setInterval(function() {
  React.render(
    AppFactory(),
    document.getElementById('container')
  );
}, 1000);


