/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadtweets = () => {
    $.ajax('/tweets/', { 
      method: 'GET'
    })
      .then(function(response) {
        renderTweets(response);
      });
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
  };

  const createTweetElement = (tweet) => {
  
    return (`
    <article>
    <header>
    <div>
    <div>
      <img src = ${escape(tweet.user.avatars)}>
      </div>
        <div>
      ${escape(tweet.user.name)}
    </div>
    </div>
     ${escape(tweet.user.handle)}
     </div>
    </header>
    <div class="tweet-text-container">
      ${escape(tweet.content.text)}
    </div>
    <footer>
    <div>
    ${moment(tweet.created_at).fromNow()}
    </div>
      <div>
      <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);

  };


  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetText = $("#tweet-text").val();
    
    if (tweetText.length > 140) {
      $('#tweet-error').html('Your tweet is over the character limit');
      $('#tweet-error').slideDown(300);
    } else if (tweetText.length === 0) {
      $('#tweet-error').html('Your tweet is empty, plese enter your tweet');
      $('#tweet-error').slideDown(300);
    } else {
      $('#tweet-error').slideUp(300);
      $('#tweet-text').val("");
      $('.counter').val(140);
      $.ajax('/tweets/', { method : 'POST', data : formData})
        .then(function(response) {
          loadtweets();
        });
    }
  });

  $('#write-tweet').on('click', function () {
    const $newTweet = $("#new-tweet");
    if ($newTweet.is(":hidden")) {
      $newTweet.slideDown(300);
      $('#tweet-text').focus();
    } else {
      $newTweet.slideUp(300);
    }
  });

  
  loadtweets();
  
});