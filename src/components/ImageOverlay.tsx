import React from 'react';
import {FavoriteButton} from './FavoritesComponent';
import {ImageProps} from '../App';

interface ImageOverlayProps {
	photo: ImageProps;
	favorites: Record<string, boolean>;
	toggleFavorite: (photoId: string) => void;
}

const ImageOverlay = ({photo, favorites, toggleFavorite}: ImageOverlayProps) => {
	return (
		<div className="overlay">
			<div>
				<h3>{photo.title}</h3>
				<p>{photo.ownername}</p>
				<FavoriteButton isFavorited={favorites[photo.id]} onClick={() => toggleFavorite(photo.id)} />
			</div>
		</div>
	);
};

export default ImageOverlay;
