import {PhotoProps} from '../App';

const ApiGetPhotos = async (page: number, perPage: number): Promise<PhotoProps[]> => {
	const apiKey = '418c92311a12ac32a76b76c3c40310e2';
	const galleryId = '195820781-72157721014962461';
	// const galleryId = '66911286-72157647277042064'; //another gallery to test
	const apiUrl = `https://www.flickr.com/services/rest/?
				method=flickr.galleries.getPhotos
				&api_key=${apiKey}
				&gallery_id=${galleryId}
				&format=json
				&nojsoncallback=1
				&extras=owner_name
				&page=${page}
				&per_page=${perPage}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseData = await response.json();
		if (responseData.stat && responseData.stat === 'fail') {
			throw new Error('API Error');
		}
		if (responseData && responseData.photos && responseData.photos.photo) {
			return responseData.photos.photo;
		} else {
			throw new Error('No photos found.');
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

export default ApiGetPhotos;
