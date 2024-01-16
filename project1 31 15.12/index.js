const categoryRandomInput = document.getElementById('random');
const fromCategoriesInput = document.getElementById('from-categories'); 
const fromCategoriesOptions = {
    'firstOption': document.getElementById('first-option'),
    'secondOption': document.getElementById('second-option'),
    'thirdOption': document.getElementById('third-option'),
    'fourthOption': document.getElementById('fourth-option'),
}
const categorySearchInput = document.getElementById('search');
const arrayInputs = [categoryRandomInput,fromCategoriesInput,categorySearchInput];
let requestLink;
let theJoke;
let theLastJokeUpdate;
let additionCategories = document.getElementById('addition-categories');
let searchInput = document.getElementById('search-input');

function categories() {
    const categoryChoosed = new Promise((resolve, reject)=>{
        document.addEventListener('click', (event)=>{
            switch (event.target) {
                case categoryRandomInput:
                    requestLink = 'https://api.chucknorris.io/jokes/random';
                    resolve();
                    break;
                case fromCategoriesInput:
                    additionCategories.style.display="block";
                    break;
                case categorySearchInput:
                    searchInput.style.display="block";
                    break;
                default:
                    console.log('nth');
                    break;
            };
        })
    })

    categoryChoosed.then(()=>{
        fetch(requestLink)
        .then(response=>response.json())
        .then(data=>{
            theLastJokeUpdate// Tutaj ma być kod, który licze ile czasu poszło z momentu ostatniej aktualizacji.
            theJoke = `
        <div class="block__container">
            <div class="first-level">
                <span>ID</span>
                <a href="">${data["id"]}</a>
                <svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M9.54545 0H5.90909C5.65806 0 5.45454 0.203515 5.45454 0.45455C5.45454 0.705585 5.65806 0.9091 5.90909 0.9091H8.44809L3.76952 5.58768C3.59204 5.76516 3.59204 6.05298 3.76952 6.2305C3.85825 6.31923 3.97458 6.36362 4.09091 6.36362C4.20724 6.36362 4.32359 6.31923 4.4123 6.23048L9.09092 1.55191V4.09091C9.09092 4.34194 9.29444 4.54546 9.54547 4.54546C9.7965 4.54546 10 4.34194 10 4.09091V0.45455C10 0.203515 9.79648 0 9.54545 0Z" fill="#8EA7FF"/>
                    <path d="M7.72725 4.54543C7.47622 4.54543 7.2727 4.74895 7.2727 4.99998V9.09089H0.90908V2.72725H4.99999C5.25103 2.72725 5.45454 2.52373 5.45454 2.2727C5.45454 2.02167 5.25103 1.81817 4.99999 1.81817H0.45455C0.203515 1.81817 0 2.02168 0 2.27272V9.54544C0 9.79645 0.203515 9.99997 0.45455 9.99997H7.72727C7.97831 9.99997 8.18182 9.79645 8.18182 9.54542V4.99998C8.1818 4.74895 7.97829 4.54543 7.72725 4.54543Z" fill="#8EA7FF"/>
                </svg>
                <svg class="like-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                    <path d="M18.4134 1.66367C17.3781 0.590857 15.9575 0 14.413 0C13.2585 0 12.2012 0.348712 11.2704 1.03637C10.8008 1.38348 10.3752 1.80814 10 2.3038C9.62494 1.80829 9.19922 1.38348 8.7294 1.03637C7.79877 0.348712 6.74149 0 5.58701 0C4.04251 0 2.62177 0.590857 1.58646 1.66367C0.563507 2.72395 0 4.17244 0 5.74252C0 7.35852 0.630341 8.83778 1.98364 10.3979C3.19427 11.7935 4.93423 13.2102 6.94916 14.8507C7.63718 15.411 8.41705 16.046 9.22684 16.7224C9.44077 16.9015 9.71527 17 10 17C10.2846 17 10.5592 16.9015 10.7729 16.7227C11.5826 16.0461 12.363 15.4108 13.0513 14.8503C15.0659 13.2101 16.8059 11.7935 18.0165 10.3978C19.3698 8.83778 20 7.35852 20 5.74238C20 4.17244 19.4365 2.72395 18.4134 1.66367Z" fill="#FF6767"/>
                  </svg>
            </div>
            <div class="second-level">
                <span class="second-level__text">
                    ${data["value"]}
                </span>
            </div>
            <div class="third-level">
                <span class="third-level__info">Last update: ${theLastJokeUpdate} hours ago</span>
            </div>
        </div>`;
        })
    })

    categoryChoosed.catch(()=>{
        console.log('Catch');
    })
}

function checkedInput(element) {
        
}

categories();
