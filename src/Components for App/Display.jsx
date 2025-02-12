import React, { useReducer, useMemo, } from "react";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  filteredData: []
}


//!!!----------MAIN COMPONENT----------!!!
export default function DisplaySection() {
  const dispatch = useDispatch();
  const [filter, filterDispatch] = useReducer(DataReducer, initialState);
  const fetchResult = useSelector(state => state.fetchResult);
  useMemo(() => {
    if (fetchResult !== '') { filterDispatch({ type: 'filterData', payload: fetchResult }) }
  }, [fetchResult]);

  function DataReducer(state = initialState, action) {
    let number = 0;
    switch (action.type) {
      case 'filterData':
        if (action.payload["result"] !== undefined && action.payload["result"].length > 0) {
          number = (Math.floor(Math.random() * action.payload.result.length));
          initialState.filteredData = {
            category: action.payload['result'][number]['categories'].length > 0 ? action.payload['result'][number]['categories'][0] : '',
            lastUpdate: action.payload['result'][number]['created_at'],
            id: action.payload['result'][number]['id'],
            value: action.payload['result'][number]['value'],
            link: action.payload['result'][number]['url'],
            liked: false
          }
        }
        else if (action.payload['status'] !== undefined) {
          initialState.filteredData = {
            category: action.payload['error'],
            lastUpdate: action.payload['timestamp'],
            id: '-',
            value: action.payload['message'],
            link: 'error',
            liked: null
          }
        }
        else if (action.payload["result"] !== undefined && action.payload["result"].length === 0) {
          initialState.filteredData = {
            category: 'no results',
            lastUpdate: '-',
            id: '-',
            value: 'There is no results for this query',
            link: '-',
            liked: null
          }
        }
        else {
          initialState.filteredData = {
            category: action.payload['categories'].length > 0 ? action.payload['categories'][0] : '',
            lastUpdate: action.payload['created_at'],
            id: action.payload['id'],
            value: action.payload['value'],
            link: action.payload['url'],
            liked: false
          }
          console.log('in Display', initialState);
        }
        break;
      case 'like':
        if (initialState.filteredData.link !== '-') {
          initialState.filteredData.liked = true;
          return dispatch({ type: 'like', payload: initialState.filteredData });
        }
        break;
      case 'unlike':
        initialState.filteredData.liked = false;
        return dispatch({ type: 'unlike', payload: initialState.filteredData });
      default:
        console.log(state);
        break;
    }
  }



  function LikeIcon() {
    if (initialState.filteredData.liked === true) {
      return (<>
        <svg
          onClick={() => { filterDispatch({ type: 'unlike' }) }}
          className="like-icon" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99996 3.96069L9.20265 2.90732C8.88154 2.48309 8.52312 2.12729 8.13517 1.84067L8.13512 1.84063C7.37611 1.27978 6.52701 1 5.58701 1C4.303 1 3.1455 1.48826 2.30612 2.358L9.99996 3.96069ZM9.99996 3.96069L10.7973 2.90737M9.99996 3.96069L10.7973 2.90737M10.7973 2.90737C11.1186 2.48298 11.4768 2.12731 11.8647 1.84068L10.7973 2.90737ZM7.58053 14.0752L7.58058 14.0753L7.58375 14.0779C8.27052 14.6371 9.05389 15.275 9.86792 15.955L9.8686 15.9555C9.89855 15.9806 9.94461 16 10 16C10.0555 16 10.1017 15.9804 10.1312 15.9558L10.1317 15.9553C10.9397 15.2803 11.7179 14.6465 12.4012 14.0901L12.4198 14.0749L12.4199 14.0748C14.458 12.4156 16.1197 11.0584 17.2611 9.74256L17.2611 9.74251C18.5017 8.3125 19 7.05701 19 5.74238C19 4.41281 18.5244 3.2189 17.6938 2.35805C16.8544 1.48826 15.697 1 14.413 1C13.4731 1 12.624 1.27974 11.8648 1.84057L7.58053 14.0752ZM7.58053 14.0752C5.54226 12.4157 3.88042 11.0584 2.73905 9.74269C1.49845 8.31245 1 7.05694 1 5.74252C1 4.41284 1.47553 3.21894 2.30603 2.35809L7.58053 14.0752Z" fill="#FF6767" stroke="#FF6767" stroke-width="2" />
        </svg>
      </>)
    }
    else {
      return (<>
        <svg
          onClick={() => { filterDispatch({ type: 'like' }) }}
          className="like-icon" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 17C9.71527 17 9.44077 16.9015 9.22684 16.7224C8.41888 16.0475 7.63992 15.4132 6.95267 14.8536L6.94916 14.8507C4.93423 13.2102 3.19427 11.7935 1.98364 10.3979C0.630341 8.83778 0 7.35852 0 5.74252C0 4.17244 0.563507 2.72395 1.58661 1.66367C2.62192 0.590857 4.04251 0 5.58716 0C6.74164 0 7.79892 0.348712 8.72955 1.03637C9.19922 1.38348 9.62494 1.80829 10 2.3038C10.3752 1.80829 10.8008 1.38348 11.2706 1.03637C12.2012 0.348712 13.2585 0 14.413 0C15.9575 0 17.3782 0.590857 18.4135 1.66367C19.4366 2.72395 20 4.17244 20 5.74252C20 7.35852 19.3698 8.83778 18.0165 10.3978C16.8059 11.7935 15.0661 13.2101 13.0515 14.8504C12.363 15.4108 11.5828 16.0461 10.773 16.7227C10.5592 16.9015 10.2846 17 10 17ZM5.58716 1.11932C4.37363 1.11932 3.25882 1.58203 2.44781 2.42232C1.62476 3.2753 1.17142 4.45439 1.17142 5.74252C1.17142 7.10165 1.70013 8.31719 2.88559 9.68375C4.03137 11.0047 5.73563 12.3923 7.70889 13.9989L7.71255 14.0018C8.4024 14.5635 9.18442 15.2003 9.99832 15.8802C10.8171 15.199 11.6003 14.5612 12.2916 13.9986C14.2647 12.392 15.9688 11.0047 17.1146 9.68375C18.2999 8.31719 18.8286 7.10165 18.8286 5.74252C18.8286 4.45439 18.3752 3.2753 17.5522 2.42232C16.7413 1.58203 15.6264 1.11932 14.413 1.11932C13.524 1.11932 12.7078 1.38931 11.9872 1.92171C11.3449 2.39637 10.8975 2.99642 10.6352 3.41627C10.5003 3.63217 10.2629 3.76105 10 3.76105C9.73709 3.76105 9.49966 3.63217 9.36478 3.41627C9.10263 2.99642 8.65524 2.39637 8.01285 1.92171C7.29218 1.38931 6.47598 1.11932 5.58716 1.11932Z" fill="#FF6767" />
        </svg>
      </>)
    }
  }

  return (
    <>
      <footer className='display-section'>
        <svg className='message-icon' width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.2504 0H2.74963C1.23352 0 0 1.23328 0 2.74963V11.6238C0 13.1367 1.22815 14.368 2.73987 14.3734V18.4004L8.5271 14.3734H17.2504C18.7665 14.3734 20 13.1399 20 11.6238V2.74963C20 1.23328 18.7665 0 17.2504 0ZM18.8281 11.6238C18.8281 12.4937 18.1204 13.2015 17.2504 13.2015H8.15942L3.91174 16.1573V13.2015H2.74963C1.87964 13.2015 1.17188 12.4937 1.17188 11.6238V2.74963C1.17188 1.87952 1.87964 1.17188 2.74963 1.17188H17.2504C18.1204 1.17188 18.8281 1.87952 18.8281 2.74963V11.6238Z" fill="#ABABAB" />
          <path d="M5.35291 4.14075H14.6471V5.31262H5.35291V4.14075Z" fill="#ABABAB" />
          <path d="M5.35291 6.64075H14.6471V7.81262H5.35291V6.64075Z" fill="#ABABAB" />
          <path d="M5.35291 9.14075H14.6471V10.3126H5.35291V9.14075Z" fill="#ABABAB" />
        </svg>
        <div className='footer-container'>
          <div className='first-object'>
            <span>ID: <a href={initialState.filteredData['link']}>{initialState.filteredData['id']}<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.54545 0H5.90909C5.65806 0 5.45454 0.203515 5.45454 0.45455C5.45454 0.705585 5.65806 0.9091 5.90909 0.9091H8.44809L3.76952 5.58768C3.59204 5.76516 3.59204 6.05298 3.76952 6.2305C3.85825 6.31923 3.97458 6.36362 4.09091 6.36362C4.20724 6.36362 4.32359 6.31923 4.4123 6.23048L9.09092 1.55191V4.09091C9.09092 4.34194 9.29444 4.54546 9.54547 4.54546C9.7965 4.54546 10 4.34194 10 4.09091V0.45455C10 0.203515 9.79648 0 9.54545 0Z" fill="#8EA7FF" />
              <path d="M7.72725 4.54543C7.47622 4.54543 7.2727 4.74895 7.2727 4.99998V9.09089H0.90908V2.72725H4.99999C5.25103 2.72725 5.45454 2.52373 5.45454 2.2727C5.45454 2.02167 5.25103 1.81817 4.99999 1.81817H0.45455C0.203515 1.81817 0 2.02168 0 2.27272V9.54544C0 9.79645 0.203515 9.99997 0.45455 9.99997H7.72727C7.97831 9.99997 8.18182 9.79645 8.18182 9.54542V4.99998C8.1818 4.74895 7.97829 4.54543 7.72725 4.54543Z" fill="#8EA7FF" />
            </svg></a>
            </span>
          </div>
          <div className='main-object'>
            <h2>{initialState.filteredData['value']}</h2>
          </div>
          <div className='third-option'>
            <label>Last update: <span className='last-update'>1923 hours ago</span></label>
            <span className='type-of-joke'>{initialState.filteredData['category']}</span>
          </div>
        </div>
        <LikeIcon />
      </footer>
    </>
  )
}