import {render, screen} from '@testing-library/react';
import FavoriteIcon from '../components/FavoriteIcon';

describe('FavoriteIcon component', () => {
	it('renders with the provided color', () => {
		const color = '#ff0000';
		render(<FavoriteIcon color={color} />);
		const svgElement = screen.getByTestId('favorite-icon-svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('fill', color);
	});

	it('renders with default color if no color prop is provided', () => {
		render(<FavoriteIcon />);
		const svgElement = screen.getByTestId('favorite-icon-svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('fill', '#ffffff');
	});

	it('renders with default color if invalid color prop is provided', () => {
		const invalidColor = 'invalid-color';
		render(<FavoriteIcon color={invalidColor} />);
		const svgElement = screen.getByTestId('favorite-icon-svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('fill', '#ffffff');
	});
});
