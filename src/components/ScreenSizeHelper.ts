const ScreenSizeHelper = () => {
	const isMobile = () => window.innerWidth <= 640;
	const isTablet = () => window.innerWidth <= 1024;
	const isDesktop = () => !isMobile() && !isTablet();

	return {
		isMobile,
		isTablet,
		isDesktop,
	};
};

export default ScreenSizeHelper;
