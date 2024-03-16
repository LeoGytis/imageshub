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
});
