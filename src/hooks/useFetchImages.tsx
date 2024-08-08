import {useState, useEffect} from 'react';
import {ImageProps} from '../utils/types';
import apiGetImages from '../utils/ApiGetImages';

interface UseFetchImagesProps {
	isTablet: boolean;
	isDesktop: boolean;
	isLastElement: boolean;
}

const useFetchImages = ({isTablet, isDesktop, isLastElement}: UseFetchImagesProps) => {
	const [images, setImages] = useState<ImageProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const imagesPerPage = isDesktop ? 12 : isTablet ? 8 : 4;

	const fetchImages = async () => {
		setIsLoading(true);
		try {
			const imagesData = await apiGetImages(page, imagesPerPage);
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
