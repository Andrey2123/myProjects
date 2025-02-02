import React from 'react';
import './App.css';
import TypographySection from './Components for App/Typography';
import FormSection from './Components for App/Form';
import DisplaySection from './Components for App/Display';
import CardSection from './Components for App/Card';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, createReducer } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

let initialState = {
  fetchResult:'',
  likedJokes:[]
}

const appReducer = createReducer(initialState,(builder)=>{
  builder
    .addCase('toFetch',(state=initialState,action)=>{
      if(action.payload!==undefined) state.fetchResult=action.payload;
      console.log('in App',state.fetchResult);
    })
    .addCase('like',(state,action)=>{
      state.likedJokes=[ ...state.likedJokes, action.payload ]
      console.log(state);
      })
    .addCase('unlike',(state,action)=>{
      console.log(action.payload);
    })
})


const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});

export default function App() {
  return(
    <>
    <Provider store={store}>
      <TypographySection />
      <FormSection />
      <DisplaySection />
      <CardSection />
    </Provider>
    </>
  )
}