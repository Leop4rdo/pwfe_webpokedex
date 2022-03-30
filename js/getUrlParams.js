"use strict";

export const getURLParam = (paramName) => {
	const urlParams = new URLSearchParams(window.location.search);

	return urlParams.get(paramName);
};
