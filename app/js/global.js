function canUseWebp () {
	const elem = document.createElement("canvas");

	if (elem.getContext && elem.getContext("2d")) {
		return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
	}
	return false;
};


if (canUseWebp() === false) {
	const lazyBgItems = document.querySelectorAll(".lazy[data-bg-fallback]")

	lazyBgItems.forEach((item) => {
		const srcBgFallback = item.getAttribute("data-bg-fallback");

		item.setAttribute("data-bg", srcBgFallback);
	})
}

var lazyLoadInstance = new LazyLoad({
	elements_selector: ".lazy"
});
