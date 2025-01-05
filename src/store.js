import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categories/categorySlice';
import quizReducer from './reducers/quizzes/quizSlice';
import searchReducer from './reducers/search/searchSlice';
import carouselReducer from './reducers/carousels/carouselSlice';
import questionReducer from './reducers/questions/questionSlice';
import userReducer from './reducers/users/userSlice';
import reportCardReducer from './reducers/report_cards/reportCardSlice';
import roomReducer from './reducers/rooms/roomSlice';
import interestsReducer from './reducers/interests/interestsSlice';
import userInterestsReducer from './reducers/user_interests/userInterestsSlice';

export default configureStore({
  reducer: {
    category: categoryReducer,
    quiz: quizReducer,
    search: searchReducer,
    carousel: carouselReducer,
    question: questionReducer,
    user: userReducer,
    reportCard: reportCardReducer,
    room: roomReducer,
    interests: interestsReducer,
    userInterests: userInterestsReducer
  },
});
