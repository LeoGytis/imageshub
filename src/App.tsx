import {useState, useEffect} from 'react';
import MediaQuery from './utils/MediaQuery';
import LoaderComponent from './components/LoaderComponent';
import useLastElementOnScreen from './utils/useLastElementOnScreen';
import ImageContainer from './components/ImageContainer';
import ApieGetImages from './utils/ApiGetImages';

export interface ImageProps {
	id: string;
	farm: number;
	server: string;
	secret: string;
	title: string;
	ownername: string;
}

function App() {
	const [images, setImages] = useState<ImageProps[]>([]);
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
			const imagesData = await ApieGetImages(page, imagesPerPage());
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
			{images.map((image) => (
				<ImageContainer image={image} />
			))}
			<div className="loader-container">{isLoading && <LoaderComponent />}</div>
		</div>
	);
}

export default App;
