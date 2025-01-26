import React from "react";
import { useEffect, useState, useReducer, useContext } from "react";
import { useDispatch } from "react-redux";


const innerState = {
  url:'',
  styles: {
    fromCategoriesObjectDisplay: 'block',
    fromCategoriesDisplay: 'none',
    searchAreaDisplay: 'none'
  }
}

export default function FormSection() {
  const dispatch = useDispatch();
  async function formReducer(state,action) {
    switch(action.type) {
      case 'animal':
        return innerState.url= 'https://api.chucknorris.io/jokes/random?category=animal';
      case 'career':
        return innerState.url= 'https://api.chucknorris.io/jokes/random?category=career';
      case 'celebrity':
        return innerState.url= 'https://api.chucknorris.io/jokes/random?category=celebrity';
      case 'dev':
        return innerState.url= 'https://api.chucknorris.io/jokes/random?category=dev';
      case 'random':
        return innerState.url= 'https://api.chucknorris.io/jokes/random';
      case 'search':
        if(action.payload===undefined) action.payload='';
        return innerState.url= 'https://api.chucknorris.io/jokes/search?query='+action.payload;
      case 'submit':
        console.log('in Form',innerState.url);
        await fetch(innerState.url)
          .then(response=>response.json())
          .then(data=>dispatch({type:'toFetch', payload:data}))
          .catch(Error=>console.log('There is an error!'))
          break;
      default:
        console.log('ok', innerState);
    }
  }

  function stylesReducer(state=innerState,action) {
    switch(action.type) {
      case 'randomRadio':
        return innerState.styles={ fromCategoriesDisplay: 'none',fromCategoriesObjectDisplay:'block', searchAreaDisplay: 'none'};
      case 'fromCategoriesRadio':
        return innerState.styles={ fromCategoriesDisplay: 'block',fromCategoriesObjectDisplay:'grid', searchAreaDisplay: 'none'};
      case 'searchRadio':
        return innerState.styles={ fromCategoriesDisplay: 'none',fromCategoriesObjectDisplay:'block', searchAreaDisplay: 'block'};
    }
  }

  const jokeCategories = ['animal','career','celebrity','dev'];
  const [state, innerDispatch] = useReducer(formReducer, innerState);
  const [styles, dispatchStyles] = useReducer(stylesReducer, innerState);
  return (
    <>
      <main className='form-section'>
          <div className='main-container'>
            <label className='random-label'><input type="radio" name="radio" value='Random' className='random-radio'
              style={{display: innerState.styles.randomRadio}}
              onClick={()=>{
                innerDispatch({type:'random'});
                dispatchStyles({type: 'randomRadio'});
              }}
            />Random</label>
            <div className='from-categories-object' style={{display: innerState.styles.fromCategoriesObjectDisplay}}>
              <label className='from-categories-label'><input type="radio" name="radio" value='From categories' className='from-categories-radio'
                onClick={()=>dispatchStyles({type: 'fromCategoriesRadio'})}
              />From categories</label>
              {jokeCategories.map((value, key) => {
                return (
                  <input type="button" value={value} id={value} className={'btn:' + key}
                    style={{display: innerState.styles.fromCategoriesDisplay}}
                    onClick={()=>innerDispatch({type:value})}
                  />
                )
              })}
            </div>
            <div className='search-object'>
              <label className='search-label'><input type="radio" name='radio' value='search' className='search-radio'
                onClick={()=>{
                  innerDispatch({type:'search'});
                  dispatchStyles({type: 'searchRadio'})
                }}  
              />Search</label>
              <input type='text' placeholder='Free text search...' className='search-area'
                style={{display: innerState.styles.searchAreaDisplay}}
                onChange={(e)=>innerDispatch({type:'search', payload: e.target.value})}
              />
            </div>
            <input type='submit' value='Get a joke' className='submit-button' onClick={()=>{
              innerDispatch({type:'submit'});
              document.querySelector('.search-area').value='';
            }}/>
          </div>
        </main>
    </>
  )
}