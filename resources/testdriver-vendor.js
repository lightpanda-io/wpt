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

window.test_driver_internal.get_named_cookie = function(name, context) {
	const cookie = window.webdriver.getNamedCookie(name);
	if (!cookie) {
		return Promise.resolve(null);
	}
	// A session cookie has no expiry; WebDriver omits the field entirely.
	if (cookie.expiry == null) {
		delete cookie.expiry;
	}
	return Promise.resolve(cookie);
};

window.test_driver_internal.action_sequence = function(actions, context) {
	return window.webdriver.actionSequence(actions);
};
