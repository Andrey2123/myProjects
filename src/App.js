import React from 'react';
import './App.css';
import TypographySection from './Components for App/Typography';
import FormSection from './Components for App/Form';
import DisplaySection from './Components for App/Display';
import CardSection from './Components for App/Card';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

const initialState = {
  fetchResult:''
}

function appReducer(state=initialState, action) {
  switch(action.type) {
    case 'toFetch':
      if(action.payload!==undefined) state.fetchResult=action.payload;
      console.log('in App',state.fetchResult);
      break;
    default:
      console.log(state);
      break;
  }
}

const store = createStore(appReducer,applyMiddleware(thunk));

export default function App() {
  return(
    <>
    <Provider context={} store={store}>
      <TypographySection />
      <FormSection />
      <DisplaySection />
      <CardSection />
    </Provider>
    </>
  )
}