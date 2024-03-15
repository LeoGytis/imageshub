import { render, screen } from "@testing-library/react";
import ResponsiveImage from "../components/ResponsiveImage";

// Mock PhotoProps
const photoMock = {
	farm: 1,
	server: "server1",
	id: "photoId",
	secret: "secretKey",
	title: "Test Photo",
	ownername: "Test Owner",
};

describe("ResponsiveImage component", () => {
	it("renders with correct image sources", () => {
		render(<ResponsiveImage photo={photoMock} isMobile={false} isTablet={false} />);
		const imgElement = screen.getByAltText(photoMock.title);
		expect(imgElement).toBeInTheDocument();

		const imageSrcSet = imgElement.getAttribute("srcSet");
		expect(imageSrcSet).toContain(
			`farm${photoMock.farm}.staticflickr.com/${photoMock.server}/${photoMock.id}_${photoMock.secret}.jpg?q=low 300w`
		);
		expect(imageSrcSet).toContain(
			`farm${photoMock.farm}.staticflickr.com/${photoMock.server}/${photoMock.id}_${photoMock.secret}.jpg?q=low 600w`
		);
		expect(imageSrcSet).toContain(
			`farm${photoMock.farm}.staticflickr.com/${photoMock.server}/${photoMock.id}_${photoMock.secret}.jpg?q=high 1024w`
		);
	});

	it("renders with correct image sizes for different viewports", () => {
		render(<ResponsiveImage photo={photoMock} isMobile={true} isTablet={true} />);
		const imgElement = screen.getByAltText(photoMock.title);
		expect(imgElement).toBeInTheDocument();

		const imageSizes = imgElement.getAttribute("sizes");
		expect(imageSizes).toBe("(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw");
	});
});
