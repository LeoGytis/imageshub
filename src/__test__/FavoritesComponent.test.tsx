import {useFavorites} from '../hooks/useFavorites';

xdescribe('FavoritesComponent', () => {
	xit('renders without crashing', () => {
		const [favorites, toggleFavorite] = useFavorites();
		expect(favorites).toBeDefined();
		expect(toggleFavorite).toBeDefined();
	});
});
