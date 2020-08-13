/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
  

    return (`
    <article class = "tweets">
    <header>
    <div>
      <img src = ${escape(tweet.user.avatars)}>
      <h3 class =${escape(tweet.user.name)}>${escape(tweet.user.name)}</h3>
    </div>
    <span class = ${escape(tweet.user.handle)}>${tweet.user.handle}</span>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <p>${moment(tweet.created_at).fromNow()}</p>
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
    const formData = $(this).serialize();
    const tweetText = $("#tweet-text").val();
    
    if (tweetText.length > 140 || tweetText.length === 0) {
      alert("Invalid tweet");
    } else {
      $.ajax('/tweets/', { method : 'POST', data : formData})
      .then(function(tweet) {
        loadtweets();
      });
    }
  });
  
});

