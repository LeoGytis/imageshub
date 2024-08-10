import {render, screen} from '@testing-library/react';
import FavoritesIcon from '../components/FavoritesIcon';

describe('FavoritesIcon component', () => {
	it('renders with the provided color', () => {
		const color = '#ff0000';
		render(<FavoritesIcon color={color} />);
		const svgElement = screen.getByTestId('favorite-icon-svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('fill', color);
	});

	it('renders with default color if no color prop is provided', () => {
		render(<FavoritesIcon />);
		const svgElement = screen.getByTestId('favorite-icon-svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('fill', '#ffffff');
	});

	it('renders with default color if invalid color prop is provided', () => {
		const invalidColor = 'invalid-color';
		render(<FavoritesIcon color={invalidColor} />);
		const svgElement = screen.getByTestId('favorite-icon-svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('fill', '#ffffff');
	});
});
