import { render, fireEvent, screen } from "@testing-library/react";
import ResponsiveImage from "../components/ResponsiveImage";

// Mock photo props for testing
const mockPhotoProps = {
	farm: 1,
	server: "server1",
	id: "123456",
	secret: "abcdef",
	title: "Test Photo",
	ownername: "Owener1",
};

describe("ResponsiveImage component", () => {
	it("renders without crashing", () => {
		const { getByAltText } = render(<ResponsiveImage photo={mockPhotoProps} isMobile={true} isTablet={true} />);
		const imgElement = screen.getByAltText(mockPhotoProps.title);
		expect(imgElement).toBeInTheDocument();
	});

	it("renders with correct srcSet based on isMobile and isTablet props", () => {
		const { getByAltText } = render(<ResponsiveImage photo={mockPhotoProps} isMobile={true} isTablet={false} />);
		const imgElement = screen.getByAltText(mockPhotoProps.title) as HTMLImageElement;
		expect(imgElement.getAttribute("srcSet")).toContain("q=low");
		expect(imgElement.getAttribute("srcSet")).not.toContain("q=medium");
	});

	it("renders with correct sizes attribute based on isMobile and isTablet props", () => {
		const { getByAltText } = render(<ResponsiveImage photo={mockPhotoProps} isMobile={false} isTablet={true} />);
		const imgElement = screen.getByAltText(mockPhotoProps.title) as HTMLImageElement;
		expect(imgElement.getAttribute("sizes")).toContain("(max-width: 600px) 100vw");
		expect(imgElement.getAttribute("sizes")).toContain("(max-width: 1024px) 50vw");
		expect(imgElement.getAttribute("sizes")).toContain("33vw");
	});

	it("renders with loading attribute set to 'lazy'", () => {
		const { getByAltText } = render(<ResponsiveImage photo={mockPhotoProps} isMobile={true} isTablet={true} />);
		const imgElement = screen.getByAltText(mockPhotoProps.title) as HTMLImageElement;
		expect(imgElement.getAttribute("loading")).toBe("lazy");
	});
});
