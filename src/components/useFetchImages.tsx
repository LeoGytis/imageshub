import {useState, useEffect} from 'react';
import {ImageProps} from '../App';
import useMediaQuery from '../utils/useMediaQuery';
import useLastElementOnScreen from '../utils/useLastElementOnScreen';
import ApieGetImages from '../utils/ApiGetImages';

const useFetchImages = () => {
	const [images, setImages] = useState<ImageProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const {isTablet, isDesktop} = useMediaQuery();
	const isLastElement = useLastElementOnScreen('.loader-container');
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

	return {images, isLoading};
};

export default useFetchImages;
