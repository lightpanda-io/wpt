/*
 * Prepare a report object containing all tests results.
 * https://wpt-docs.readthedocs.io/en/latest/_writing-tests/testharness-api.html#callback-api
 */
var report = {
  complete: false,
  status: "",
  log: "no test suite completion|Fail|The test never reaches the completion callback.",
  cases: {},
  name: function(test) {
    const name = test.name;
    return name ? name.replace(/\n/g, '') : name;
  },
  format: function(test) {
    var log = report.name(test)+"|"+test.format_status();
    if (test.message != null) {
      log +=  "|"+test.message.replaceAll("\n"," ");
    }
    return log;
  }
}

function update() {
  var log = "";
  Object.keys(report.cases).forEach((k, i) => {
    log += report.cases[k] + "\n";
  });
  report.log = log;
}

add_test_state_callback(function (test) {
  report.cases[report.name(test)] = report.format(test);
  update();
});

add_result_callback(function (test) {
  report.cases[report.name(test)] = report.format(test);
  update();
});

add_completion_callback(function (tests, status) {
  report.complete = true;
});
