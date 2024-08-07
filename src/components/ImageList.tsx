import ResponsiveImage from './ResponsiveImage';
import ImageOverlay from './ImageOverlay';
import FavoriteIcon from './FavoriteIcon';
import {FavoritesComponent} from './FavoritesComponent';
import {ImageProps} from '../utils/types';
import MediaQuery from '../utils/MediaQuery';

const ImageList = ({images}: {images: ImageProps[]}) => {
	const {isMobile, isTablet, isDesktop} = MediaQuery();
	const [favorites, toggleFavorite] = FavoritesComponent();

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
					{favorites[image.id] ? <FavoriteIcon color={'#ffffff'} /> : null}
				</div>
			))}
		</>
	);
};

export default ImageList;
