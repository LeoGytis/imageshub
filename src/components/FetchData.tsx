import React, { useState, useEffect } from "react";
import LoaderComponent from "./LoaderComponent";
import FavoriteComponent from "./FavoriteComponent";

interface PhotoProps {
	id: string;
	farm: number;
	server: string;
	secret: string;
	title: string;
	ownername: string;
}

const FetchData: React.FC = (): JSX.Element => {
	const [photos, setPhotos] = useState<PhotoProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	const initialFavorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")!) : {};
	const [favorites, setFavorites] = useState<Record<string, boolean>>(initialFavorites);

	const apiKey = "164c38fb43c193481ea2a3dfc30b4180"; //public api key
	// --- big macro gallery ---
	// const galleryId = "195820781-72157721014962461";
	// --- test small gallery ---
	const galleryId = "91216181-72157638326919233";

	useEffect(() => {
		fetchPhotos();
	}, []);

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const fetchPhotos = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${apiKey}&gallery_id=${galleryId}&format=json&nojsoncallback=1&extras=owner_name`
			);
			const responseData = await response.json();
			if (responseData && responseData.photos && responseData.photos.photo) {
				setPhotos(responseData.photos.photo);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

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
						{favorites[photo.id] ? <FavoriteComponent /> : "Favorite"}
					</div>
				))}
				{isLoading && <LoaderComponent />}
			</div>
		</>
	);
};

export default FetchData;
