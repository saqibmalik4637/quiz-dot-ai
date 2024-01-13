import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'

export default configureStore({
  reducer: {
    category: categoryReducer
  }
})
