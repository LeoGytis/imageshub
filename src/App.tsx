import {useState, useEffect} from 'react';
import MediaQuery from './utils/MediaQuery';
import LoaderComponent from './components/LoaderComponent';
import ApiGetPhotos from './utils/ApiGetPhotos';
import useLastElementOnScreen from './utils/useLastElementOnScreen';
import ImageContainer from './components/ImageContainer';

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
				<ImageContainer photo={photo} />
			))}
			<div className="loader-container">{isLoading && <LoaderComponent />}</div>
		</div>
	);
}

export default App;
