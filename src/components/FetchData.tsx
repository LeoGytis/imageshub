import React, { useState, useEffect } from "react";

interface PhotoProps {
	id: string;
	farm: number;
	server: string;
	secret: string;
	title: string;
	ownerId: string;
}

const FetchData: React.FC = (): JSX.Element => {
	const [photos, setPhotos] = useState<PhotoProps[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const apiKey = "a38a46fe5bac997c4fdde47d6b7ed5bf";
	const userId = "4e99becb24e6b830";
	// const galleryId = "195820781-72157721014962461"; // big macro gallery
	const galleryId = "91216181-72157638326919233";

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const response = await fetch(
					`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${apiKey}&gallery_id=${galleryId}&format=json&nojsoncallback=1&owner_name&extras=owner_name`
				);
				const responseData = await response.json();
				if (responseData && responseData.photos && responseData.photos.photo) {
					setPhotos(responseData.photos.photo);
				}
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	console.log("🚀 :: photos ::", photos);

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="gallery_wrapper">
					{photos &&
						photos.map((photo, i) => (
							<div className="photo_container" key={i}>
								<img
									key={photo.id}
									alt={photo.title}
									src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
								/>
							</div>
						))}
				</div>
			)}
		</>
	);
};

export default FetchData;
