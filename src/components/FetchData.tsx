import React, { useState, useEffect, useCallback } from "react";
import LoaderComponent from "./LoaderComponent";
import FavoriteComponent from "./FavoriteComponent";
import ScreenSizeHelper from "./ScreenSizeHelper";

interface PhotoProps {
	id: string;
	farm: number;
	server: string;
	secret: string;
	title: string;
	ownername: string;
}

const FetchData = () => {
	const [photos, setPhotos] = useState<PhotoProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const { isMobile, isTablet, isDesktop } = ScreenSizeHelper();

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
		return isMobile() ? 3 : isTablet() ? 6 : 9; // Number of photos per page
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

	// Function to handle scroll events
	const handleScroll = useCallback(() => {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
				{photos.map((photo) => (
					<div className="photo_container" key={photo.id}>
						<img
							alt={photo.title}
							src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
						/>
						<div className="overlay">
							<div>
								<h3>{photo.title}</h3>
								<p>{photo.ownername}</p>
							</div>
							<button onClick={() => toggleFavorite(photo.id)}>
								{favorites[photo.id] ? "Unfavorite" : "Favorite"}
							</button>
						</div>
					</div>
				))}
				{isLoading && <LoaderComponent />}
			</div>
		</>
	);
};

export default FetchData;
