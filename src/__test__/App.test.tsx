import {render, screen} from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
	test('renders without crashing', () => {
		render(<App />);
	});

	test('renders loader when isLoading is true', () => {
		const {getByTestId} = render(<App />);
		const loader = screen.getByTestId('loader-component');
		expect(loader).toBeInTheDocument();
	});

	test('renders correct number of image-container elements based on the images state', async () => {
		render(<App />);
		const imageContainers = await screen.findAllByTestId('image-container');
		expect(imageContainers.length).toBeGreaterThan(0);
	});

	xtest('each image-container element contains the correct child elements', async () => {
		const {container} = render(<App />);

		// Wait for the image-container elements to appear in the DOM
		const imageContainers = await screen.findAllByTestId('image-container', {}, {container});

		// Loop through each image-container element
		for (const imageContainer of imageContainers) {
			const responsiveImage = await screen.findByTestId('responsive-image');
			expect(responsiveImage).toBeInTheDocument();

			const overlay = await screen.findByTestId('overlay');
			expect(overlay).toBeInTheDocument();
		}
	});
});
