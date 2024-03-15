import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
	test("renders without crashing", () => {
		render(<App />);
	});

	test("renders loader when isLoading is true", () => {
		const { getByTestId } = render(<App />);
		const loader = screen.getByTestId("loader-component");
		expect(loader).toBeInTheDocument();
	});
});
