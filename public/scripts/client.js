/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function () {

  const getTweets = () => {
    $.ajax('/tweets/', { method: 'GET'})
    .then(function(response) {
      renderTweets(response);
    }) ;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = (tweet) => {
    const tweetDate = new Date(tweet.created_at);
    const currentDate = new Date();
    const tweetInDays = Math.floor((currentDate.getTime() - tweetDate.getTime()) / (1000 * 3600 * 24));

    return (`
    <article class = "tweets">
    <header>
    <div>
      <img src = ${tweet.user.avatars}>
      <h3 class =${tweet.user.name}>${tweet.user.name}</h3>
    </div>
    <span class = ${tweet.user.handle}>${tweet.user.handle}</span>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <p>${tweetInDays} days ago</p>
      <div class = "tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);

  };

  $('#submit-tweet').submit(function (event) {
    event.preventDefault();
    const formData = ($(this).serialize());

    $.ajax('/tweets/', { method: 'POST', data: formData })
    .then(function(response) {
      console.log('Response: ', response);
    })

  });
  
});

