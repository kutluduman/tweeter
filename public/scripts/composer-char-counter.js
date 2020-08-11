$(document).ready(() => {

 const textArea = $('.new-tweet textarea');

 textArea.on('keyup', function(key) {
   console.log($(this).val());
 })

})