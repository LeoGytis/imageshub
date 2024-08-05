import {useState, useEffect} from 'react';
import LoaderComponent from './components/LoaderComponent';
import useLastElementOnScreen from './utils/useLastElementOnScreen';
import ImageContainer from './components/ImageContainer';
import ApieGetImages from './utils/ApiGetImages';
import useMediaQuery from './utils/useMediaQuery';

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
	const {isTablet, isDesktop} = useMediaQuery();
	const imagesPerPage = () => (isDesktop() ? 12 : isTablet() ? 8 : 4);

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
