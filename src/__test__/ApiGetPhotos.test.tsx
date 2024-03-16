import { PhotoProps } from "../App";
import ApiGetPhotos from "../utils/ApiGetPhotos";
import fetchMock from "jest-fetch-mock";

xdescribe("ApiGetPhotos", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	xit("handles API errors gracefully", async () => {
		// Mocking a failed fetch request
		const errorMessage = "API Error";
		fetchMock.mockRejectOnce(new Error(errorMessage));

		const photos = await ApiGetPhotos(1, 10);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(expect.any(String));

		// The function should return an empty array if an error occurs
		expect(photos).toEqual([]);

		// Check if the error message matches the expected message
		expect(console.error).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));
		expect(console.error).toHaveBeenCalledWith(`Error fetching data: ${errorMessage}`);
	});
});
