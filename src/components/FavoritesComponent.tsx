import { useState, useEffect } from "react";

const FavoritesComponent = (): [Record<string, boolean>, (photoId: string) => void] => {
	const initialFavorites: Record<string, boolean> = JSON.parse(localStorage.getItem("favorites") || "{}");
	const [favorites, setFavorites] = useState<Record<string, boolean>>(initialFavorites);

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (photoId: string): void => {
		setFavorites((prevFavorites) => ({
			...prevFavorites,
			[photoId]: !prevFavorites[photoId],
		}));
	};

	return [favorites, toggleFavorite];
};

const FavoriteButton: React.FC<{ isFavorited: boolean; onClick: () => void }> = ({ isFavorited, onClick }) => (
	<button onClick={onClick} className="favourite-button">
		{isFavorited ? "Unfavorite" : "Favorite"}
	</button>
);

export { FavoritesComponent, FavoriteButton };
