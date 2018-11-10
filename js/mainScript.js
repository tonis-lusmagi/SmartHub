    var clicks = 0; //get value from server
    
      var mode = getStoredValue('myPageMode');

      function storeValue(key, value) {
          if (localStorage) {
              localStorage.setItem(key, value);
          } else {
              $.cookies.set(key, value);
          }
      }

      function getStoredValue(key) {
          if (localStorage) {
              return localStorage.getItem(key);
          } else {
              return $.cookies.get(key);
          }
      }

      //optimize this fn
      function retrieveValues() { //load current counter value into HTML and 'disable' button when allready clicked on previous session
        var trigger = false;
       
        document.getElementById("counter").innerHTML = clicks;
        if (getStoredValue('myPageMode')) {
                $('.btn-like-3').toggleClass("btn-like-3 btn-like-3-clicked");
                $(this).removeClass('btn-like-3-clicked');
                trigger = true;
        } else
        if (trigger == false) {
            $('.btn-like-3').on('click', function(e) {
                $('.btn-like-3').removeClass('btn-like-3');
                $(this).addClass('btn-like-3-clicked');
            });
        }
      }
      function clr() {
        localStorage.removeItem("myPageMode");
      }
      


 /*
      //optimize this fn
      function retrieveValues() { //load current counter value into HTML and 'disable' button when allready clicked on previous session
        document.getElementById("counter").innerHTML = clicks;

        if (getStoredValue('myPageMode')) {
          $('.btn-like').addClass('active');

          $('.btn-like').hover(function() {
            $(this).removeClass('btn-like');
            $(this).addClass('btn-like-clicked');
            $(this).addClass('active');
          });
        }
      }
*/


      //FIXME
      function countFunction(mode) {
        if (getStoredValue('myPageMode')) {
          return;
          //document.write("Error - You have already clicked Like, can't anymore"); //debugging
        }
        else {
          clicks += 1;
          //add it to server value, should work correctly when value in server changes when browsing the page, this mean don't add it to value that is in buffer
          //just get server value again and do +1, and save it.

          //nother possibility is just add +1 straight to server value, disregard buffered value. Refresh and display final value to user.
        }
        mode = mode;
        storeValue('myPageMode', mode);
        
        document.getElementById("counter").innerHTML = clicks;
      }