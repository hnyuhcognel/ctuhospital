function validator(options) {
	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}
			element = element.parentElement;
		}
	}

	var selectorRules = {};

	function validate(inputElement, rule) {
		var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
		var errorMessage;

		var rules = selectorRules[rule.selector];

		for (var i = 0; i < rules.length; ++i) {
			switch (inputElement.type) {
				case 'radio':
				case 'checkbox':
					errorMessage = rules[i](
						formElement.querySelector(rule.selector + ':checked')
					);
					break;
				default:
					errorMessage = rules[i](inputElement.value);
			}
			if (errorMessage) break;
		}

		if (errorMessage) {
			errorElement.innerText = errorMessage;
			getParent(inputElement, options.formGroupSelector).classList.add('invalid');
		} else {
			errorElement.innerText = '';
			getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
		}

		return !errorMessage;
	}

	var formElement = document.querySelector(options.form);
	if (formElement) {
		formElement.onsubmit = function (e) {

			var isFormValid = true;

			options.rules.forEach(function (rule) {
				var inputElement = formElement.querySelector(rule.selector);
				var isValid = validate(inputElement, rule);
				if (!isValid) {
					isFormValid = false;
				}
			});

			if (isFormValid) {
				formElement.submit();
			}
			else {
				e.preventDefault();
			}
		}

		options.rules.forEach(function (rule) {

			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}

			var inputElements = formElement.querySelectorAll(rule.selector);

			Array.from(inputElements).forEach(function (inputElement) {
				inputElement.onblur = function () {
					validate(inputElement, rule);
				}

				inputElement.oninput = function () {
					var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
					errorElement.innerText = '';
					getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
				}
			});
		});
	}

}

validator.isRequired = function (selector, message) {
	return {
		selector: selector,
		test: function (value) {
			return value ? undefined : message || 'Vui lòng nhập trường này'
		}
	};
}

validator.isEmail = function (selector, message) {
	return {
		selector: selector,
		test: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : message || 'Trường này phải là email';
		}
	};
}

validator.isPhoneNumber = function (selector, message) {
	return {
		selector: selector,
		test: function (value) {
			var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
			return regex.test(value) ? undefined : message || 'Trường này phải là số điện thoại';
		}
	};
}

validator.minLength = function (selector, min, message) {
	return {
		selector: selector,
		test: function (value) {
			return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
		}
	};
}

validator.maxLength = function (selector, max, message) {
	return {
		selector: selector,
		test: function (value) {
			return value.length <= max ? undefined : message || `Vui lòng nhập tối đa ${max} kí tự`;
		}
	};
}

validator.xDigits = function (selector, num, message) {
	return {
		selector: selector,
		test: function (value) {
			return value.length === num ? undefined : message || `Vui lòng nhập đủ ${num} kí tự`;
		}
	};
}

validator.isConfirmed = function (selector, getConfirmValue, message) {
	return {
		selector: selector,
		test: function (value) {
			return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
		}
	}
}
