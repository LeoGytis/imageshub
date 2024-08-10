import {render, screen} from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		const mockIntersectionObserver = jest.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders without crashing', () => {
		render(<App />);
	});

	test('renders loader when isLoading is true', () => {
		render(<App />);
		const loader = screen.getByTestId('loader-component');
		expect(loader).toBeInTheDocument();
	});

	test('renders correct number of image-container elements based on the images state', async () => {
		render(<App />);
		const imageContainers = await screen.findAllByTestId('image-container');
		expect(imageContainers.length).toBeGreaterThan(0);
	});
});
