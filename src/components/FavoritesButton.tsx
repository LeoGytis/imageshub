export const FavoritesButton: React.FC<{isFavorited: boolean; onClick: () => void}> = ({isFavorited, onClick}) => (
	<button onClick={onClick} className="favorites-button">
		{isFavorited ? 'Unfavorite' : 'Favorite'}
	</button>
);
