import {useState, useEffect} from 'react';

const useOnScreen = () => {
	const [isNearExit, setIsNearExit] = useState<boolean>(false);

	useEffect(() => {
		const options = {
			root: null, // Use the viewport as the root
			rootMargin: '0px', // No extra margin around the viewport
			threshold: 1, // Trigger as soon as any part of the element is visible
		};

		const observer = new IntersectionObserver(([entry]) => {
			// Determine if the bottom of the element is within the viewport
			setIsNearExit(entry.isIntersecting && entry.boundingClientRect.bottom <= window.innerHeight);
		}, options);

		// Select the target element
		const target = document.querySelector('.gallery-container');
		if (target) {
			observer.observe(target);
		}

		// Cleanup observer when the component unmounts
		return () => {
			if (target) observer.unobserve(target);
		};
	}, []); // Empty dependency array means this effect runs only once

	return isNearExit;
};

export default useOnScreen;
