import ResponsiveImage from './ResponsiveImage';
import ImageOverlay from './ImageOverlay';
import FavoritesIcon from './FavoritesIcon';
import {ImageProps} from '../utils/types';
import MediaQuery from '../utils/MediaQuery';
import useFavorites from '../hooks/useFavorites';

const ImagesList = ({images}: {images: ImageProps[]}) => {
	const {isMobile, isTablet, isDesktop} = MediaQuery();
	const [favorites, toggleFavorite] = useFavorites();

	return (
		<>
			{images.map((image) => (
				<div
					onClick={!isDesktop() ? () => toggleFavorite(image.id) : undefined}
					className="image-container"
					data-testid="image-container"
					key={image.id}
				>
					<ResponsiveImage image={image} isMobile={isMobile()} isTablet={isTablet()} />
					<ImageOverlay image={image} favorites={favorites} toggleFavorite={toggleFavorite} />
					{favorites[image.id] ? <FavoritesIcon color={'#ffffff'} /> : null}
				</div>
			))}
		</>
	);
};

export default ImagesList;
