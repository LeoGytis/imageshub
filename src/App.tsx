import React, { useState, useEffect, useCallback, useRef } from "react";
import ScreenSizeHelper from "./components/ScreenSizeHelper";
import FavoriteComponent from "./components/FavoriteComponent";
import LoaderComponent from "./components/LoaderComponent";
import ResponsiveImage from "./components/ResponsiveImage";

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
	const [page, setPage] = useState<number>(1);
	const { isMobile, isTablet, isDesktop } = ScreenSizeHelper();
	const lastPhotoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	const initialFavorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")!) : {};
	const [favorites, setFavorites] = useState<Record<string, boolean>>(initialFavorites);

	const apiKey = "164c38fb43c193481ea2a3dfc30b4180";
	// const galleryId = "91216181-72157638326919233";
	const galleryId = "195820781-72157721014962461";
	const perPage = () => {
		return isMobile() ? 6 : isTablet() ? 9 : 12; // Number of photos per page
	};
	const apiUrl = `https://www.flickr.com/services/rest/?\
	&method=flickr.galleries.getPhotos\
	&api_key=${apiKey}\
	&gallery_id=${galleryId}\
	&format=json\
	&nojsoncallback=1\
	&extras=owner_name\
	&page=${page}\
	&per_page=${perPage()}`;

	useEffect(() => {
		fetchPhotos();
	}, []);

	useEffect(() => {
		fetchPhotos();
	}, [page]);

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	// Function to fetch photos from the API
	const fetchPhotos = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await fetch(apiUrl);
			const responseData = await response.json();
			if (responseData && responseData.photos && responseData.photos.photo) {
				// Prevent duplication of photos on the initial page load
				if (page === 1) {
					setPhotos(responseData.photos.photo);
				} else {
					setPhotos((prevPhotos) => [...prevPhotos, ...responseData.photos.photo]);
				}
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isLoading) {
					setPage((prevPage) => prevPage + 1);
				}
			},
			{ threshold: 1 }
		);

		if (lastPhotoRef.current) {
			observer.observe(lastPhotoRef.current);
		}

		return () => {
			const currentRef = lastPhotoRef.current;
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [isLoading]);

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

	const toggleFavorite = (photoId: string): void => {
		setFavorites((prevFavorites) => ({
			...prevFavorites,
			[photoId]: !prevFavorites[photoId],
		}));
	};

	return (
		<>
			<div className="gallery_container">
				{photos.map((photo, index) => (
					<div
						className="photo_container"
						key={photo.id}
						ref={index === photos.length - 1 ? lastPhotoRef : undefined}
					>
						<ResponsiveImage photo={photo} isMobile={isMobile()} isTablet={isTablet()} />
						<div className="overlay">
							<div>
								<h3>{photo.title}</h3>
								<p>{photo.ownername}</p>{" "}
								<button onClick={() => toggleFavorite(photo.id)} className="favourite_button">
									{favorites[photo.id] ? "Unfavourite" : "Favourite"}
								</button>
							</div>
						</div>

						{favorites[photo.id] ? <FavoriteComponent color={"#ffffff"} /> : null}
					</div>
				))}
				{isLoading && <LoaderComponent />}
			</div>
		</>
	);
}

export default App;
