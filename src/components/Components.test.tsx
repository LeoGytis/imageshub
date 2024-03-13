import { render, screen } from "@testing-library/react";
import ResponsiveImage from "./ResponsiveImage";

describe("ResponsiveImage component", () => {
	const photoMock = {
		farm: 1,
		server: "server",
		id: "id",
		secret: "secret",
		title: "title",
		ownername: "ownername", // Adding ownername property
	};

	it("renders correctly", () => {
		render(<ResponsiveImage photo={photoMock} isMobile={false} isTablet={false} />);
		expect(screen.getByAltText(photoMock.title)).toBeInTheDocument();
	});

	it("renders with correct image sources for mobile", () => {
		render(<ResponsiveImage photo={photoMock} isMobile={true} isTablet={false} />);
		const imageElement = screen.getByAltText(photoMock.title);
		expect(imageElement).toHaveAttribute("srcset", expect.stringContaining("q=low"));
	});

	it("renders with correct image sources for tablet", () => {
		render(<ResponsiveImage photo={photoMock} isMobile={false} isTablet={true} />);
		const imageElement = screen.getByAltText(photoMock.title);
		expect(imageElement).toHaveAttribute("srcset", expect.stringContaining("q=medium"));
	});

	it("renders with correct image sources for desktop", () => {
		render(<ResponsiveImage photo={photoMock} isMobile={false} isTablet={false} />);
		const imageElement = screen.getByAltText(photoMock.title);
		expect(imageElement).toHaveAttribute("srcset", expect.stringContaining("q=high"));
	});
});
