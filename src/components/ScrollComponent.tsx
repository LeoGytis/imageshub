import { useEffect, useCallback } from "react";

interface ScrollOptionsProps {
	isLoading: boolean;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollComponent = ({ isLoading, setPage }: ScrollOptionsProps) => {
	const handleScroll = useCallback(() => {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrolledToBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight;

		if (scrolledToBottom && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isLoading, setPage]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);
};

export default ScrollComponent;
