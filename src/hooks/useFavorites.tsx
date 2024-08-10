import {useState, useEffect} from 'react';

const useFavorites = (): [Record<string, boolean>, (imageId: string) => void] => {
	const initialFavorites: Record<string, boolean> = JSON.parse(localStorage.getItem('favorites') || '{}');
	const [favorites, setFavorites] = useState<Record<string, boolean>>(initialFavorites);

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (imageId: string): void => {
		setFavorites((prevFavorites) => ({
			...prevFavorites,
			[imageId]: !prevFavorites[imageId],
		}));
	};

	return [favorites, toggleFavorite];
};

export default useFavorites;
