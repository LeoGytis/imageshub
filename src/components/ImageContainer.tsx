import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import ImageOverlay from './ImageOverlay';
import FavoriteIcon from './FavoriteIcon';
import {PhotoProps} from '../App';
import {FavoritesComponent} from './FavoritesComponent';
import MediaQuery from '../utils/MediaQuery';

const ImageContainer = ({image}: {image: PhotoProps}) => {
	const {isMobile, isTablet, isDesktop} = MediaQuery();
	const [favorites, toggleFavorite] = FavoritesComponent();

	return (
		<div
			onClick={!isDesktop() ? () => toggleFavorite(image.id) : undefined}
			className="photo-container"
			data-testid="photo-container"
			key={image.id}
		>
			<ResponsiveImage photo={image} isMobile={isMobile()} isTablet={isTablet()} />
			<ImageOverlay photo={image} favorites={favorites} toggleFavorite={toggleFavorite} />
			{favorites[image.id] ? <FavoriteIcon color={'#ffffff'} /> : null}
		</div>
	);
};

export default ImageContainer;
