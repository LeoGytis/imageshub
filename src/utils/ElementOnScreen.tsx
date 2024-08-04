import React, {useEffect, useState, ReactNode} from 'react';

interface ElementOnScreenProps {
	options: IntersectionObserverInit;
	children: (isVisible: boolean) => ReactNode;
}

const ElementOnScreen = ({options, children}: ElementOnScreenProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const callbackFunction = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			setIsVisible(entry.isIntersecting);
		};

		const observer = new IntersectionObserver(callbackFunction, options);
		const element = document.querySelector('.observe-me');

		if (element) observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, [options]);

	return <>{children(isVisible)}</>;
};

export default ElementOnScreen;
