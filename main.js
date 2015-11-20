'use strict';
//Get user info and set up
var username = prompt("Please enter your scratch username:");
var message = prompt("Please enter your message:"); //This is a test message sent out to all of my followers.
var numofpages = prompt("How many pages of followers do you have?"); //Know there is a better way to do this...
var myFollowers = [];
var page = 1;

function start( e ) {
  //Starts the process
  $.get( "https://scratch.mit.edu/users/" + username + "/followers/?page=1", loaded ); //Get first page of followers
}
function loaded( data ) {
  var $dom = $( data );
  var $users = $dom.find('span.title').children();

  for (var i=0; i<$users.length; i++) {
    var user = $users[i].text.trim(); //Get next user
    myFollowers.push(user); //Push to array
  }
  console.log("Done page" + page); //Debug
  page++;
  
  if(page < numofpages){
    //If there are more followers, load them
    $.get( "https://scratch.mit.edu/users/" + username + "/followers/?page="+page, loaded ); //Keeps 404 error from occurring, not sure if necessary.
  }
  else{
    //we got all of the followers, start sending messages
    postmethod();
  }
};

function postmethod(){
  //Same as before
  var start = confirm("Start?"); //Confirm
  console.log(start);  //Debug
  console.log(myFollowers);
  if(start == true){
    for (var i = 0; i<myFollowers.length; i++){
      console.log("Looping...");  //Debug
      var current = myFollowers[i];
      $.ajax({
          type: "POST",
          url: "https://scratch.mit.edu/site-api/comments/user/" + current + "/add/",
          data: JSON.stringify({"content":message,"parent_id":"","commentee_id":""})
      });
      console.log("Sent to user " + current);
    }
    console.log("Done.");
  } 
  else {
    console.log("Canceled.");
  }
};

console.log("Stating..."); //Debug
start(); 