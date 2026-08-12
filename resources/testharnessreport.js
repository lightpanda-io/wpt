/*
 * Prepare a report object containing all tests results.
 * https://wpt-docs.readthedocs.io/en/latest/_writing-tests/testharness-api.html#callback-api
 */
var report = {
  complete: false,
  status: "",
  cases: {},

  get log() {
    const keys = Object.keys(report.cases);
    if (keys.length === 0) {
      return "no test suite completion|Fail|The test never reaches the completion callback.";
    }
    var log = "";
    for (const k of keys) {
      log += report.cases[k] + "\n";
    }
    return log;
  },
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

add_test_state_callback(function (test) {
  report.cases[report.name(test)] = report.format(test);
});

add_result_callback(function (test) {
  report.cases[report.name(test)] = report.format(test);
});

add_completion_callback(function (tests, status) {
  report.complete = true;
});
