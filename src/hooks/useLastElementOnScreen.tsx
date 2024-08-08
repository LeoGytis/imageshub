import {useState, useEffect} from 'react';

const useLastElementOnScreen = (targetSelector: string) => {
	const [isOnScreen, setIsOnScreen] = useState<boolean>(false);

	useEffect(() => {
		const target = document.querySelector(targetSelector);
		const options = {
			root: null,
			rootMargin: '50px',
			threshold: 0,
		};

		const observer = new IntersectionObserver(([entry]) => {
			setIsOnScreen(entry.isIntersecting);
		}, options);

		if (target) {
			observer.observe(target);
		}

		// Cleanup observer when the component unmounts
		return () => {
			if (target) observer.unobserve(target);
		};
	}, [targetSelector]);

	return isOnScreen;
};

export default useLastElementOnScreen;
