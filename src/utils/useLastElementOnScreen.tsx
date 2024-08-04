import {useState, useEffect} from 'react';

const useLastElementOnScreen = (targetSelector: string) => {
	const [isNearExit, setIsNearExit] = useState<boolean>(false);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '50px',
			threshold: 0,
		};

		const observer = new IntersectionObserver(([entry]) => {
			// Check if the target element is within the viewport
			setIsNearExit(entry.isIntersecting);
		}, options);

		// Select the target element
		const target = document.querySelector(targetSelector);
		if (target) {
			observer.observe(target);
		}

		// Cleanup observer when the component unmounts
		return () => {
			if (target) observer.unobserve(target);
		};
	}, [targetSelector]);

	return isNearExit;
};

export default useLastElementOnScreen;
