// Initialize Firebase
var config = {
    apiKey: "AIzaSyDct5GrKMRhE420Qb6a2qDTPtReoY4x9Co",
    authDomain: "fabian-portfolio.firebaseapp.com",
    databaseURL: "https://fabian-portfolio.firebaseio.com",
    projectId: "fabian-portfolio",
    storageBucket: "fabian-portfolio.appspot.com",
    messagingSenderId: "160528317510"
};


firebase.initializeApp(config);

var portfolioRef = firebase.database().ref('portfolio/');
var messasgeRef = firebase.database().ref('message/');
