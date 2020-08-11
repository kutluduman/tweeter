$(document).ready(() => {

 const textArea = $('.new-tweet textarea');

 textArea.on('keyup', function(key) {
   console.log(140 - $(this).val().length);
 })

})