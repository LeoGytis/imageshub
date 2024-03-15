import { PhotoProps } from "../App";
import ApiGetPhotos from "../utils/ApiGetPhotos";

// Mocking fetch function
(global as any).fetch = jest.fn().mockImplementation((url: string) => {
	// Assuming we're mocking the Flickr API response
	const apiKey = "fakeApiKey";
	const galleryId = "fakeGalleryId";
	const expectedUrl = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${apiKey}&gallery_id=${galleryId}&format=json&nojsoncallback=1&page=1&per_page=2`;

	if (url === expectedUrl) {
		return Promise.resolve({
			json: () =>
				Promise.resolve({
					photos: {
						photo: [
							{
								id: "1",
								farm: 1,
								server: "server1",
								secret: "secret1",
								title: "Photo 1",
								ownername: "Owner 1",
							},
							{
								id: "2",
								farm: 2,
								server: "server2",
								secret: "secret2",
								title: "Photo 2",
								ownername: "Owner 2",
							},
						],
					},
				}),
		});
	} else {
		throw new Error(`Unexpected URL: ${url}`);
	}
});

describe("ApiGetPhotos", () => {
	beforeEach(() => {
		(global.fetch as jest.Mock).mockClear();
	});

	it("fetches photos from the API", async () => {
		const photos = await ApiGetPhotos(1, 10);
		expect(global.fetch as jest.Mock).toHaveBeenCalledTimes(1);
		expect(global.fetch as jest.Mock).toHaveBeenCalledWith(expect.any(String));

		// Assuming that the returned data structure is an array of photo objects
		const expectedPhotos: PhotoProps[] = [
			{
				id: "1",
				farm: 1,
				server: "server1",
				secret: "secret1",
				title: "Photo 1",
				ownername: "Owner 1",
			},
			{
				id: "2",
				farm: 2,
				server: "server2",
				secret: "secret2",
				title: "Photo 2",
				ownername: "Owner 2",
			},
		];
		expect(photos).toEqual(expectedPhotos);
	});

	it("handles API errors gracefully", async () => {
		// Mocking a failed fetch request
		(global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject("API Error"));

		const photos = await ApiGetPhotos(1, 10);
		expect(global.fetch as jest.Mock).toHaveBeenCalledTimes(1);
		expect(global.fetch as jest.Mock).toHaveBeenCalledWith(expect.any(String));

		// The function should return an empty array if an error occurs
		expect(photos).toEqual([]);
	});
});
