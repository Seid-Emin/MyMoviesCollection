export const selectConfig = {
  watchStatus: {
    name: 'watchStatus',
    options: {
      watching: 'watching',
      completed: 'completed',
      on_hold: 'on_hold',
      dropped: 'dropped',
      plan_to_watch: 'plan_to_watch'
    }
  },
  userRating: {
    name: 'userRating',
    options: {
      select: 'select',
      10: '(10) Masterpiece',
      9: '(9) Great',
      8: '(8) Very Good',
      7: '(7) Good',
      6: '(6) Fine',
      5: '(5) Average',
      4: '(4) Bad',
      3: '(3) Very Bad',
      2: '(2) Horrible',
      1: '(1) Appalling'
    }
  },
  mediaType: {
    name: 'mediaType',
    options: {
      all: 'all',
      movie: 'movie',
      tv: 'tv'
    }
  },
  cardStatus: {
    options: {
      watching: 'cw',
      completed: 'cmpl',
      on_hold: 'hold',
      dropped: 'drop',
      plan_to_watch: 'ptw'
    }
  }
}