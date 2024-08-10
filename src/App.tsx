import ImagesList from './components/ImagesList';
import LoaderComponent from './components/LoaderComponent';
import useFetchImages from './hooks/useFetchImages';
import useLastElementOnScreen from './hooks/useLastElementOnScreen';
import MediaQuery from './utils/MediaQuery';

function App() {
	const {isTablet, isDesktop} = MediaQuery();
	const isLastElement = useLastElementOnScreen('.loader-container');

	const {images, isLoading} = useFetchImages({
		isTablet: isTablet(),
		isDesktop: isDesktop(),
		isLastElement,
	});

	return (
		<div className="gallery-container">
			<ImagesList images={images} />
			<div className="loader-container">{isLoading && <LoaderComponent />}</div>
		</div>
	);
}

export default App;
