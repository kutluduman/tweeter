/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


$(document).ready(function () {

  const createTweetElement = (tweet) => {

    return `
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
      <p>10 days ago</p>
      <div class = "tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`


  };



});