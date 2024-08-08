import MediaQuery from '../utils/MediaQuery';

describe('MediaQuery', () => {
	let mediaQuery: any;

	beforeAll(() => {
		// Mock window.innerWidth
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			value: 1025, // Mock desktop width
		});

		mediaQuery = MediaQuery();
	});

	it('should detect desktop mode', () => {
		expect(mediaQuery.isDesktop()).toBe(true);
		expect(mediaQuery.isMobile()).toBe(false);
		expect(mediaQuery.isTablet()).toBe(false);
	});

	it('should detect tablet mode', () => {
		// Change window width to tablet size
		(window as any).innerWidth = 800;
		window.dispatchEvent(new Event('resize'));

		expect(mediaQuery.isDesktop()).toBe(false);
		expect(mediaQuery.isMobile()).toBe(false);
		expect(mediaQuery.isTablet()).toBe(true);
	});

	it('should detect mobile mode', () => {
		// Change window width to mobile size
		(window as any).innerWidth = 500;
		window.dispatchEvent(new Event('resize'));

		expect(mediaQuery.isDesktop()).toBe(false);
		expect(mediaQuery.isMobile()).toBe(true);
		expect(mediaQuery.isTablet()).toBe(false);
	});

	it('should detect mobile mode at threshold', () => {
		// Change window width to mobile size threshold
		(window as any).innerWidth = 640;
		window.dispatchEvent(new Event('resize'));

		expect(mediaQuery.isDesktop()).toBe(false);
		expect(mediaQuery.isMobile()).toBe(true);
		expect(mediaQuery.isTablet()).toBe(false);
	});

	it('should detect tablet mode at threshold', () => {
		// Change window width to tablet size threshold
		(window as any).innerWidth = 1024;
		window.dispatchEvent(new Event('resize'));

		expect(mediaQuery.isDesktop()).toBe(false);
		expect(mediaQuery.isMobile()).toBe(false);
		expect(mediaQuery.isTablet()).toBe(true);
	});

	// Cleanup
	afterAll(() => {
		delete (window as any).innerWidth;
	});
});
