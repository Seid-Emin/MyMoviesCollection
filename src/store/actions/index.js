export {
  search,
  fetchMultiSearch,
} from './searchAction';

export {
  fetchSelected,
  selectedMediaType,
  preloadSelected,
  showSelected,
  hideSelected
} from './selectedAction';

export { fetchFilteredMedia, fetchFilteredMediaSuccess, fetchFilteredMediaFail, preloadFilteredMedia } from './fetchFilteredMediaAction';

export { signIn, signOut, signUp } from './authActions';

// export { addMediaToFirestoreCollection } from './mediaActions';

export { addMediaToFirestoreCollection, getCollectionFromFirestore, deleteMediaFromFirestore, filterByStatus, updateMediaStatus } from './collectionActions';