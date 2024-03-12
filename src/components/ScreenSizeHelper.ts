const ScreenSizeHelper = () => {
	let isMobile = window.innerWidth <= 640;
	let isTablet = window.innerWidth <= 1024;

	const updateScreenSize = () => {
		isMobile = window.innerWidth <= 640;
		isTablet = window.innerWidth <= 1024;
	};

	window.addEventListener("resize", updateScreenSize);

	const isMobileFunc = () => isMobile;
	const isTabletFunc = () => isTablet;
	const isDesktop = () => !isMobile && !isTablet;

	return {
		isMobile: isMobileFunc,
		isTablet: isTabletFunc,
		isDesktop,
	};
};

export default ScreenSizeHelper;
