const MediaQuery = () => {
	let activeMode = "";

	const updateScreenSize = () => {
		const width = window.innerWidth;
		if (width <= 640) {
			activeMode = "mobile";
		} else if (width <= 1024) {
			activeMode = "tablet";
		} else {
			activeMode = "desktop";
		}
	};
	window.addEventListener("resize", updateScreenSize);

	updateScreenSize();

	const isMobile = () => activeMode === "mobile";
	const isTablet = () => activeMode === "tablet";
	const isDesktop = () => activeMode === "desktop";

	return {
		isMobile,
		isTablet,
		isDesktop,
	};
};

export default MediaQuery;
