import * as firebase from 'firebase';
import React,{Component} from 'react';

const firebaseApp = {
    apiKey: "AIzaSyA6VLjyazyiiU2LSf9mIxmu1by6pWn5pkE",
    authDomain: "garsh-2fac4.firebaseapp.com",
    databaseURL: "https://garsh-2fac4.firebaseio.com",
    projectId: "garsh-2fac4",
    storageBucket: "garsh-2fac4.appspot.com",
    messagingSenderId: "75036111350"
  };
  firebase.initializeApp(firebaseApp);

  export const database = firebase.database().ref('allphones');
  export const configStorage = firebase.storage().ref('banners');
  console.log(process);