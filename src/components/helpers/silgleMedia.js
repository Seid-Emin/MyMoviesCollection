export const singleMedia = (media, id, fetchSelected, selectedMediaType, showSelected) => {
  fetchSelected(id, media);
  selectedMediaType(media);
  showSelected();
}