export const FavoriteButton: React.FC<{isFavorited: boolean; onClick: () => void}> = ({isFavorited, onClick}) => (
	<button onClick={onClick} className="favorite-button">
		{isFavorited ? 'Unfavorite' : 'Favorite'}
	</button>
);
