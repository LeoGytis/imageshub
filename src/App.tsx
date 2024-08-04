import {useState, useEffect} from 'react';
import MediaQuery from './utils/MediaQuery';
import FavoriteIcon from './components/FavoriteIcon';
import LoaderComponent from './components/LoaderComponent';
import ResponsiveImage from './components/ResponsiveImage';
import ApiGetPhotos from './utils/ApiGetPhotos';
import {FavoriteButton, FavoritesComponent} from './components/FavoritesComponent';
import ScrollComponent from './utils/ScrollComponent';

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
	const [page, setPage] = useState<number>(1);
	const {isMobile, isTablet, isDesktop} = MediaQuery();
	const perPage = () => {
		return isDesktop() ? 12 : isTablet() ? 8 : 4; // Number of photos per page
	};
	// const observer = new IntersectionObserver(callbackFunction, options)

	ScrollComponent({isLoading, setPage});

	// Function to fetch photos from the API
	const fetchPhotos = async () => {
		setIsLoading(true);
		try {
			const photosData = await ApiGetPhotos(page, perPage());
			// Prevent duplication of photos on the initial page load
			if (page === 1) {
				setPhotos([...photosData]);
			} else {
				setPhotos((prevPhotos) => [...prevPhotos, ...photosData]);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, [page]);

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
			{isLoading && <LoaderComponent />}
		</div>
	);
}

export default App;
