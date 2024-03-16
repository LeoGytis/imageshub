import { PhotoProps } from "../App";

interface ResponsiveImageProps {
	photo: PhotoProps;
	isMobile: boolean;
	isTablet: boolean;
}

const ResponsiveImage = ({ photo, isMobile, isTablet }: ResponsiveImageProps) => {
	const baseImageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;

	const smallSize = isMobile ? "q=low" : "q=low";
	const mediumSize = isTablet ? "q=medium" : "q=low";
	const largeSize = "q=high";

	// Provide multiple image sources with different resolutions
	const imageSrcSet = `${baseImageUrl}.jpg?${smallSize} 300w,
                       ${baseImageUrl}.jpg?${mediumSize} 600w,
                       ${baseImageUrl}.jpg?${largeSize} 1024w`;

	return (
		<img
			alt={photo.title}
			srcSet={imageSrcSet}
			sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
			loading="lazy"
			data-testid="responsive-image"
		/>
	);
};

export default ResponsiveImage;
