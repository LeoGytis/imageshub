export const FavoritesButton: React.FC<{isFavorited: boolean; onClick: () => void}> = ({isFavorited, onClick}) => (
	<button onClick={onClick} className="favoritesf-button">
		{isFavorited ? 'Unfavorite' : 'Favorite'}
	</button>
);
