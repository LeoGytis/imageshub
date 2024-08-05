import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import ImageOverlay from './ImageOverlay';
import FavoriteIcon from './FavoriteIcon';
import {PhotoProps} from '../App';
import {FavoritesComponent} from './FavoritesComponent';
import MediaQuery from '../utils/MediaQuery';

const ImageContainer = ({photo}: {photo: PhotoProps}) => {
	const {isMobile, isTablet, isDesktop} = MediaQuery();
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
