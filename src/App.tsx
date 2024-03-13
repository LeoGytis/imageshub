import { useState, useEffect, useCallback } from "react";
import MediaQuery from "./components/MediaQuery";
import FavoriteIcon from "./components/FavoriteIcon";
import LoaderComponent from "./components/LoaderComponent";
import ResponsiveImage from "./components/ResponsiveImage";
import ApiGetPhotos from "./components/ApiGetPhotos";
import { FavoriteButton, FavoritesComponent } from "./components/FavoritesComponent";

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
	const { isMobile, isTablet, isDesktop } = MediaQuery();
	const perPage = () => {
		return isDesktop() ? 12 : isTablet() ? 8 : 4; // Number of photos per page
	};

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
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchPhotos();
	}, []);

	useEffect(() => {
		fetchPhotos();
	}, [page]);

	// Function to handle scroll events
	const handleScroll = useCallback(() => {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrolledToBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight;

		if (scrolledToBottom && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isLoading]);

	// Scroll event listener
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<>
			<div className="gallery_container">
				{photos.map((photo) => (
					<div className="photo_container" key={photo.id}>
						<ResponsiveImage photo={photo} isMobile={isMobile()} isTablet={isTablet()} />
						<div className="overlay">
							<div>
								<h3>{photo.title}</h3>
								<p>{photo.ownername}</p>{" "}
								<FavoriteButton
									isFavorited={favorites[photo.id]}
									onClick={() => toggleFavorite(photo.id)}
								/>
							</div>
						</div>

						{favorites[photo.id] ? <FavoriteIcon color={"#ffffff"} /> : null}
					</div>
				))}
				{isLoading && <LoaderComponent />}
			</div>
		</>
	);
}

export default App;
