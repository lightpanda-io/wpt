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

// WebDriver "Element Send Keys": focus the element, then a down/up pair per key.
window.test_driver_internal.send_keys = function(element, keys) {
	element.focus();
	const NULL_KEY = '\uE000';
	const MODIFIERS = new Set(['\uE008', '\uE009', '\uE00A', '\uE03D', '\uE050', '\uE051', '\uE052', '\uE053']);

	// hold modifier down until special NULL_KEY, then release themall
	const held = [];
	const actions = [];
	const releaseHeld = (at) => {
		while (held.length) {
			actions.splice(at, 0, {type: "keyUp", value: held.pop()});
		}
	};

	for (const key of keys) {
		if (key === NULL_KEY) {
			releaseHeld(actions.length);
		} else if (MODIFIERS.has(key)) {
			actions.push({type: "keyDown", value: key});
			held.push(key);
		} else {
			actions.push({type: "keyDown", value: key});
			actions.push({type: "keyUp", value: key});
		}
	}
	const last = actions[actions.length - 1];
	releaseHeld(last && last.type === "keyUp" ? actions.length - 1 : actions.length);
	return window.webdriver.actionSequence([{type: "key", actions}]);
};
