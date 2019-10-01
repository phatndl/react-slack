import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeXIaOiE8vottochSbmh62T_jLGh7JxNg",
  authDomain: "react-slack-59f8b.firebaseapp.com",
  databaseURL: "https://react-slack-59f8b.firebaseio.com",
  projectId: "react-slack-59f8b",
  storageBucket: "react-slack-59f8b.appspot.com",
  messagingSenderId: "895248307240",
  appId: "1:895248307240:web:7bc08942b3c7be6382911d",
  measurementId: "G-VG20MZMS9R"
};

firebase.initializeApp(firebaseConfig);

export default firebase;