//YOUR FIREBASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyDAxHmyBC9Ztjz2pGT0VZ2Vu_EFIOchkNo",
    authDomain: "kwitterv2-4.firebaseapp.com",
    databaseURL: "https://kwitterv2-4-default-rtdb.firebaseio.com",
    projectId: "kwitterv2-4",
    storageBucket: "kwitterv2-4.appspot.com",
    messagingSenderId: "252855998861",
    appId: "1:252855998861:web:5531474fad3f09cc4fc5c4",
    measurementId: "G-WJPBLY0RJ0"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("Username:");
roomname = localStorage.getItem("Room Name:");

function send(){
    user_msg = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        name: username,
        message: user_msg,
        like: 0

    });

    document.getElementById("msg").innerHTML="";
}

function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name1 = message_data["name"];
        message = message_data["message"];
        like = message_data["like"];
        name2 = "<h4>"+name1+"<img class='user_tick' src='tick.png'></h4>";
        messageTag = "<h4 class='message_h4'>"+message+"</h4>";
        likeBtn = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        spanTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span><hr>";
        xyz = name2+messageTag+likeBtn+spanTag;
        document.getElementById("output").innerHTML += xyz;
//End code
      } });  }); }
getData();

function updateLike(message_idd){
    console.log("Like Button Clicked: "+message_idd);
    button = message_idd;
    number_likes = document.getElementById(button).value;
    updated = Number(number_likes)+1;
    console.log(updated+": "+number_likes);
    firebase.database().ref(roomname).child(message_idd).update({like: updated});
}

function logout(){
    localStorage.removeItem("Username:");
    localStorage.removeItem("Room Name:");
    window.location = "index.html";
}
