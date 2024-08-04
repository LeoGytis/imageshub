import {useState, useEffect} from 'react';
import MediaQuery from './utils/MediaQuery';
import FavoriteIcon from './components/FavoriteIcon';
import LoaderComponent from './components/LoaderComponent';
import ResponsiveImage from './components/ResponsiveImage';
import ApiGetPhotos from './utils/ApiGetPhotos';
import {FavoriteButton, FavoritesComponent} from './components/FavoritesComponent';
import useLastElementOnScreen from './utils/useLastElementOnScreen';

export interface PhotoProps {
	id: string;
	farm: number;
	server: string;
	secret: string;
	title: string;
	ownername: string;
}

function App() {
	const [photos, setPhotos] = useState<PhotoProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [favorites, toggleFavorite] = FavoritesComponent();
	const isLastElement = useLastElementOnScreen('.loader-container');
	const [page, setPage] = useState<number>(1);
	const {isMobile, isTablet, isDesktop} = MediaQuery();
	const perPage = () => {
		return isDesktop() ? 12 : isTablet() ? 8 : 4; // Number of photos per page depending on screen size
	};

	const fetchPhotos = async () => {
		setIsLoading(true);
		try {
			const photosData = await ApiGetPhotos(page, perPage());
			setPhotos((prevPhotos) => (page === 1 ? photosData : [...prevPhotos, ...photosData]));
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, [page]);

	useEffect(() => {
		if (isLastElement && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isLastElement]);

	return (
		<div className="gallery-container">
			{photos.map((photo) => (
				<div
					onClick={!isDesktop() ? () => toggleFavorite(photo.id) : undefined}
					className="photo-container"
					data-testid="photo-container"
					key={photo.id}
				>
					<ResponsiveImage photo={photo} isMobile={isMobile()} isTablet={isTablet()} />
					<div className="overlay">
						<div>
							<h3>{photo.title}</h3>
							<p>{photo.ownername}</p>{' '}
							<FavoriteButton
								isFavorited={favorites[photo.id]}
								onClick={() => toggleFavorite(photo.id)}
							/>
						</div>
					</div>
					{favorites[photo.id] ? <FavoriteIcon color={'#ffffff'} /> : null}
				</div>
			))}
			<div className="loader-container">{isLoading && <LoaderComponent />}</div>
		</div>
	);
}

export default App;
