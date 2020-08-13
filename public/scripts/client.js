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
    $('#tweets-container').empty();
    const sortTweets = tweets.sort((a,b) => a.created_at - b.created_at);
    for (const tweet of sortTweets) {
      renderTweet(tweet);
    }
  };

  const renderTweet = function(tweet) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }

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


  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetText = $("#tweet-text").val();
    
    if (tweetText.length > 140) {
      $('.error-message').html('Your tweet is long');
      $('#tweeterror').slideDown("300");
    } else if (tweetText.length === 0) {
      $('.error-message').html('Your tweet is empty, plese enter your tweet');
      $('#tweeterror').slideDown("300");
    } else {
      $('#tweet-error').addClass("hidden");
      $('#tweet-error').html("");
      $('#tweet-text').val("");
      $('.counter').val(140);
      $.ajax('/tweets/', { method : 'POST', data : formData})
      .then(function(response) {
        loadtweets();
      });
    }
  });
  
  loadtweets();
  
});

