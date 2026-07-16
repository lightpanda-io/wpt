window.test_driver.delete_all_cookies = async function() {
	window.webdriver.deleteAllCookies();
}

// probably doesn't work in most cases, but can't be worse than doing nothing
window.test_driver_internal.click = function(element, coords) {
	const target = coords ? (document.elementFromPoint(coords.x, coords.y) || element) : element
	window.webdriver.click(target);
	return Promise.resolve();
}

window.test_driver_internal.get_computed_label = function(element) {
	return Promise.resolve(window.webdriver.getComputedLabel(element));
};

window.test_driver_internal.action_sequence = function(actions, context) {
	return window.webdriver.actionSequence(actions);
};
