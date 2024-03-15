/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ScrollComponent from "../components/ScrollComponent";

// Mock window object properties
Object.defineProperty(window, "innerHeight", { value: 500 });
Object.defineProperty(document.documentElement, "scrollHeight", { value: 1000 });
Object.defineProperty(window, "scrollY", { value: 0 });

describe("ScrollComponent", () => {
	it("should call setPage when scrolled to bottom", () => {
		const setPage = jest.fn();
		const { container } = render(<ScrollComponent isLoading={false} setPage={setPage} />);

		fireEvent.scroll(window, { target: { scrollY: 500 } });

		expect(setPage).toHaveBeenCalledTimes(1);
	});

	it("should not call setPage when isLoading is true", () => {
		const setPage = jest.fn();
		const { container } = render(<ScrollComponent isLoading={true} setPage={setPage} />);

		fireEvent.scroll(window, { target: { scrollY: 500 } });

		expect(setPage).not.toHaveBeenCalled();
	});

	it("should not call setPage if not scrolled to bottom", () => {
		const setPage = jest.fn();
		const { container } = render(<ScrollComponent isLoading={false} setPage={setPage} />);

		fireEvent.scroll(window, { target: { scrollY: 0 } });

		expect(setPage).not.toHaveBeenCalled();
	});
});
