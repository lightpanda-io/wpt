# Web Platform Tests

This repository hosts WPT tests cases run by lightpanda.io

The tests cases source is https://github.com/web-platform-tests/wpt

## Differences with original

The `testharness.js` and `testharnessreport.js`  in `./resources/` are
modified versions of the original sources due to lightpanda.io sepecific needs.

The test case named `./success.html` doesn't exist in the original sources.

## Add a new WPT test case

We add new tests cases files with implemented changes in Browsercore.

Copy the test case you want to add from the [WPT
repo](https://github.com/web-platform-tests/wpt) in this repo and commit
the files.

:warning: Please keep the original directory tree structure.
