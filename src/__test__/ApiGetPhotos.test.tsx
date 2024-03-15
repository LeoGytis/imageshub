import ApiGetPhotos from "../components/ApiGetPhotos";

// Mocking fetch function
(global as any).fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      photos: {
        photo: [{ id: 1, title: 'Photo 1' }, { id: 2, title: 'Photo 2' }]
      }
    })
  })
);

describe('ApiGetPhotos', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('fetches photos from the API', async () => {
    const photos = await ApiGetPhotos(1, 10);
    expect((global.fetch as jest.Mock)).toHaveBeenCalledTimes(1);
    expect((global.fetch as jest.Mock)).toHaveBeenCalledWith(expect.any(String));

    // Assuming that the returned data structure is an array of photo objects
    expect(photos).toEqual([{ id: 1, title: 'Photo 1' }, { id: 2, title: 'Photo 2' }]);
  });

  it('handles API errors gracefully', async () => {
    // Mocking a failed fetch request
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API Error'));

    const photos = await ApiGetPhotos(1, 10);
    expect((global.fetch as jest.Mock)).toHaveBeenCalledTimes(1);
    expect((global.fetch as jest.Mock)).toHaveBeenCalledWith(expect.any(String));

    // The function should return an empty array if an error occurs
    expect(photos).toEqual([]);
  });
});
