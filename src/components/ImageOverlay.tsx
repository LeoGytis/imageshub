import React from 'react';
import {ImageProps} from '../utils/types';
import {FavoritesButton} from './FavoritesButton';

interface ImageOverlayProps {
	image: ImageProps;
	favorites: Record<string, boolean>;
	toggleFavorite: (imageId: string) => void;
}

const ImageOverlay = ({image, favorites, toggleFavorite}: ImageOverlayProps) => {
	return (
		<div className="overlay">
			<div>
				<h3>{image.title}</h3>
				<p>{image.ownername}</p>
				<FavoritesButton isFavorited={favorites[image.id]} onClick={() => toggleFavorite(image.id)} />
			</div>
		</div>
	);
};

export default ImageOverlay;
