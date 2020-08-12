/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const loadtweets = () => {
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

  loadtweets();

  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const formData = ($(this).serialize());

    $.ajax('/tweets/', { method: 'POST', data: formData })
    .then(function(response) {
      console.log('Response: ', response);
    });

  });
  
});

