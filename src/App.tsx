import LoaderComponent from './components/LoaderComponent';
import ImageList from './components/ImageList';
import useMediaQuery from './utils/useMediaQuery';
import useFetchImages from './hooks/useFetchImages';
import useLastElementOnScreen from './hooks/useLastElementOnScreen';

function App() {
	const {isTablet, isDesktop} = useMediaQuery();
	const isLastElement = useLastElementOnScreen('.loader-container');

	const {images, isLoading} = useFetchImages({
		isTablet: isTablet(),
		isDesktop: isDesktop(),
		isLastElement,
	});

	return (
		<div className="gallery-container">
			<ImageList images={images} />
			<div className="loader-container">{isLoading && <LoaderComponent />}</div>
		</div>
	);
}

export default App;
