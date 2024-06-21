/*
 * Prepare a report object containeing all tests results.
 * https://wpt-docs.readthedocs.io/en/latest/_writing-tests/testharness-api.html#callback-api
 */
var report = {
  status: "",
  log: "no test suite completion|Fail|The test never reaches the completion callback.",
  cases: {},
};

function format(test) {
  var log = test.name+"|"+test.format_status();
  if (test.message != null) {
    log +=  "|"+test.message.replaceAll("\n"," ");
  }

  return log;
}

function update() {
  var log = "";
  Object.keys(report.cases).forEach((k, i) => {
    log += report.cases[k] + "\n";
  });
  report.log = log;
}

add_test_state_callback(function (test) {
  report.cases[test.name] = format(test);
  update();
});

add_result_callback(function (test) {
  report.cases[test.name] = format(test);
  update();
});
