let updatedContainer;

export const filterSellection = (container, statusKey, statusValue, mediaKey, mediaType) => {
  // Set initial container
  updatedContainer = container;

  // If status Nav clicked
  // Check for the clicked status and perform filter
  // to update the collection
  if (statusValue !== 'all_media') {
    updatedContainer = filterMatch(updatedContainer, statusKey, statusValue);
  }

  // If mediaType changed
  // Check for the changed value and perform filter
  // to update the collection
  if (mediaType !== 'all') {
    updatedContainer = filterMatch(updatedContainer, mediaKey, mediaType);
  }

  return updatedContainer
}

export const filterMatch = (container, key, value) => {
  return updatedContainer = container.filter(item => item[key] == value)
}

export const filterExclude = (container, key, value) => {
  return updatedContainer = container.filter(item => item[key] !== value)
}