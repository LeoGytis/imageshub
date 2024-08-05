import React from 'react';
import {PhotoProps} from '../App';
import {FavoriteButton} from './FavoritesComponent';

interface ImageOverlayProps {
	photo: PhotoProps;
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
