export const filterImagesResponse = (response: any): number[] => {
  return response.data?.imageIds || [];
};
