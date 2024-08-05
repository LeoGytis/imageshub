import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import ImageOverlay from './ImageOverlay';
import FavoriteIcon from './FavoriteIcon';
import {PhotoProps} from '../App';
import {FavoritesComponent} from './FavoritesComponent';

interface ImageContainerProps {
	photo: PhotoProps;
	isDesktop: () => boolean;
	isMobile: () => boolean;
	isTablet: () => boolean;
	// favorites: {[key: number]: boolean};
	// toggleFavorite: (id: number) => void;
}

const ImageContainer = ({photo, isDesktop, isMobile, isTablet}: ImageContainerProps) => {
	const [favorites, toggleFavorite] = FavoritesComponent();

	return (
		<div
			onClick={!isDesktop() ? () => toggleFavorite(photo.id) : undefined}
			className="photo-container"
			data-testid="photo-container"
			key={photo.id}
		>
			<ResponsiveImage photo={photo} isMobile={isMobile()} isTablet={isTablet()} />
			<ImageOverlay photo={photo} favorites={favorites} toggleFavorite={toggleFavorite} />
			{favorites[photo.id] ? <FavoriteIcon color={'#ffffff'} /> : null}
		</div>
	);
};

export default ImageContainer;
