import * as actionTypes from '../actions/actionTypes';


const initialState = {
  loading: false,
  selectedMedia: {
    adult: false,
    backdrop_path: "/9myrRcegWGGp24mpVfkD4zhUfhi.jpg",
    belongs_to_collection: {
      id: 263,
      name: "The Dark Knight Collection",
      poster_path: "/bqS2lMgGkuodIXtDILFWTSWDDpa.jpg",
      backdrop_path: "/xfKot7lqaiW4XpL5TtDlVBA9ei9.jpg"
    },
    budget: 150000000,
    genres: [
      {
        id: 28,
        name: "Action"
      },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" }
    ],
    homepage: "https://www.warnerbros.com/movies/batman-begins/",
    id: 272,
    imdb_id: "tt0372784",
    original_language: "en",
    original_title: "Batman Begins",
    overview: "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
    popularity: 29.434,
    poster_path: "/dr6x4GyyegBWtinPBzipY02J2lV.jpg",
    production_companies: [
      { id: 429, logo_path: "/2Tc1P3Ac8M479naPp1kYT3izLS5.png", name: "DC Comics", origin_country: "US" },
      { id: 923, logo_path: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png", name: "Legendary Entertainment", origin_country: "US" },
      { id: 9993, logo_path: "/2Tc1P3Ac8M479naPp1kYT3izLS5.png", name: "DC Entertainment", origin_country: "US" },
      { id: 9996, logo_path: "/3tvBqYsBhxWeHlu62SIJ1el93O7.png", name: "Syncopy", origin_country: "GB" },
      { id: 19231, logo_path: null, name: "Patalex III Productions Limited", origin_country: "" },
      { id: 174, logo_path: "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png", name: "Warner Bros. Pictures", origin_country: "US" },
    ],
    production_countries: [
      { iso_3166_1: "GB", name: "United Kingdom" },
      { iso_3166_1: "US", name: "United States of America" }
    ],
    release_date: "2005-06-10",
    revenue: 374218673,
    runtime: 140,
    spoken_languages: [
      { iso_639_1: "en", name: "English" },
      { iso_639_1: "ur", name: "اردو" },
      { iso_639_1: "zh", name: "普通话" }
    ],
    status: "Released",
    tagline: "Evil fears the knight.",
    title: "Batman Begins",
    video: false,
    vote_average: 7.6,
    vote_count: 13650
  },
  selectedMediaType: ''
}

export const selsecteMediaType = (state, action) => {
  return {
    ...state,
    selectedMediaType: action.selectedMediaType
  }
}

export const fetchStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const fetchSelectedSuccess = (state, action) => {
  return {
    ...state,
    selectedMedia: action.selectedMedia,
    loading: false
  };
};

export const fetchFail = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SELECTED_START: return fetchStart(state, action);
    case actionTypes.FETCH_SELECTED_SUCCESS: return fetchSelectedSuccess(state, action);
    case actionTypes.FETCH_SELECTED_FAIL: return fetchFail(state, action);

    case actionTypes.PICK_SELECTED_MEDIA_TYPE: return selsecteMediaType(state, action);
    default: return state;
  }
}

export default reducer