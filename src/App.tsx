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
	const [photos, setImages] = useState<PhotoProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const isLastElement = useLastElementOnScreen('.loader-container');
	const [page, setPage] = useState<number>(1);
	const {isTablet, isDesktop} = MediaQuery();
	const imagesPerPage = () => {
		return isDesktop() ? 12 : isTablet() ? 8 : 4; // Number of images per page depending on screen size
	};

	const fetchImages = async () => {
		setIsLoading(true);
		try {
			const imagesData = await ApiGetPhotos(page, imagesPerPage());
			setImages((prevImages) => (page === 1 ? imagesData : [...prevImages, ...imagesData]));
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchImages();
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
