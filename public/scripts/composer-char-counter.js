$(document).ready(() => {
  const counter = $('.counter')[0];
  const textArea = $('textarea');
  // event handler for everytime the new tweet form receives an input that updates the character counter live and changes it's color if it ever goes above 140

  /*
  Handles input event, when the tweet form receives input,
  the character count begins going backwards and gets red when it passes
  0
  */
  $(textArea).on('input', function() {
    let textCount = $(this).val();
    $(counter).text(140 - textCount.length);

    if (textCount.length > 140) {
      $(counter).addClass('redLimit');
    } else {
      $(counter).removeClass('redLimit');
    }


  });
 
});