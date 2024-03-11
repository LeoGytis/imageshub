import React, { useState, useEffect } from "react";

interface Item {
	name: string;
	// Add more properties as needed
}

const LookUpGallery: React.FC = (): JSX.Element => {
	const [data, setData] = useState<Item[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const apiKey = "a38a46fe5bac997c4fdde47d6b7ed5bf";
	const userId = "4e99becb24e6b830";
	const galleryId = "66911286-72157647277042064";

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const response = await fetch(
					`https://www.flickr.com/services/rest/?method=flickr.test.echo&api_key=${apiKey}&gallery_id=${galleryId}&format=json`
				);
				const responseData: Item[] = await response.json();
				setData(responseData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
			console.log("🚀 :: fetchData :: setData ::", data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>API Data</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					{data ? (
						<ul>
							{data.map((item: Item, index: number) => (
								<li key={index}>{item.name}</li>
							))}
						</ul>
					) : (
						<p>No data available</p>
					)}
				</div>
			)}
		</div>
	);
};

export default LookUpGallery;
