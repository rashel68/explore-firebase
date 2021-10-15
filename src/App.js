import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import initAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initAuthentication();
const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState({});
  // google btn handler 
  const handleBtn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedUser)
      });
  }

  // fb btn handler 
  const handleFBbutton = () => {
    signInWithPopup(auth, fbProvider)
      .then(result => {
        const fbUser = result.user;
        console.log(fbUser);
      })
  }

  const handleGithubBtn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const gitUser = result.user;
        console.log(gitUser);

      })
  }
  return (
    <div className="App">
      <button onClick={handleBtn}>Sign with google</button>
      <button onClick={handleFBbutton}>Sign In with FB</button>
      <button onClick={handleGithubBtn}>Sign In with GitHub</button>
      <div>
        <h2>Welcome {user.name}</h2>
        <h3>I know your email address: {user.email}</h3>
        <img src={user.photo} alt="" />

      </div>
    </div>
  );
}

export default App;
