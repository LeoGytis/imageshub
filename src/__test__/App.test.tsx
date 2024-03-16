import { render, screen } from "@testing-library/react";
import App, { PhotoProps } from "../App";
import ApiGetPhotos from "../utils/ApiGetPhotos";

describe("App Component", () => {
	test("renders without crashing", () => {
		render(<App />);
	});

	test("renders loader when isLoading is true", () => {
		const { getByTestId } = render(<App />);
		const loader = screen.getByTestId("loader-component");
		expect(loader).toBeInTheDocument();
	});

	const mockPhotos: PhotoProps[] = [
		{ id: "1", farm: 1, server: "server1", secret: "secret1", title: "Title 1", ownername: "Owner 1" },
		{ id: "2", farm: 2, server: "server2", secret: "secret2", title: "Title 2", ownername: "Owner 2" },
	];

	test("renders correct number of photo-container elements based on the photos state", async () => {
		render(<App />);
		const photoContainers = await screen.findAllByTestId("photo-container");
		expect(photoContainers.length).toBeGreaterThan(0);
	});
	test("each photo-container element contains the correct child elements", async () => {
		const { container } = render(<App />); // Destructure container from render result

		// Wait for the photo-container elements to appear in the DOM
		const photoContainers = await screen.findAllByTestId("photo-container", {}, { container });

		// Loop through each photo-container element
		for (const photoContainer of photoContainers) {
			const responsiveImage = await screen.findByTestId("responsive-image");
			expect(responsiveImage).toBeInTheDocument();

			// const overlay = await screen.findByTestId("overlay");
			// expect(overlay).toBeInTheDocument();
		}
	});
});
