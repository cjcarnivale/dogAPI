/* global $ */
/* eslint-disable no-console */
'use strict';

$('.js-dog-pictures-form').submit(function(event){
  event.preventDefault(); 
  $('.js-dog-image-grid').empty(); 
  const inputValue = $('.js-number-input').val();
  fetch(`https://dog.ceo/api/breeds/image/random/${inputValue}`) 
    .then( response => response.json() )
    .then( data => {
      let html = data.message.map(item => `<img src= ${item}>`);  
      html = html.join(' ');   
      $('.js-dog-image-grid').html(html);  
    }); 
});
// NEXT -- text block with server fail message - no breed of that name on server!
// THEN -- text block with server success message - found the breed!
$('.js-dog-breed-form').submit(function(event){
  event.preventDefault();
  $('.js-dog-image-grid').empty(); 
  const breedValue = $('.js-breed-input').val();
  fetch(`https://dog.ceo/api/breed/${breedValue}/images/random`) 
    .then(response => {
      if (response.ok) { 
        return response.json();   
      }
      console.log(response);
      throw new Error(response.status);
    }) 
    .then(responseJson => {
      $('.breed-return-message').html(`<p>${breedValue} found!</p>`);
      $('.js-dog-image-grid').prepend( `<img src="${responseJson.message}" 
      class="dog-picture" alt="image of a ${breedValue} dog breed"/>` );
    })
    
    .catch(error => {
      $('.breed-return-message').html(`<p>Something went wrong! 
      ${error.message} Error</p>`);
    });
});