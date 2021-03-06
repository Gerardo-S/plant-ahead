import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../util/authContext";
import leaves from "../images/leaves.png";
import "../styles/signup-login.css";
import { useSpring, animated } from "react-spring";

const styles = {
  wrapper: {
    marginTop: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "12em",
  },
  submitButton: {
    marginTop: "1em",
  },
};

function SignupPage() {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });
  const { signup } = useAuth();
  const history = useHistory();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isPending, setIsPending] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formState;
    if (password.length < 8) {
      alert("Password must have at least 8 characters.");
    } else if (username.length < 6) {
      alert("Username must contain at least 6 characters.");
    } else if (username.length > 16) {
      alert("Username must not contain more than 16 characters.");
    } else {
      setIsPending(true);
      signup({ username, password })
        .then(() => history.push("/protected/main"))
        .catch((error) => {
          console.log(error);
          alert("An error occurred.");
          setIsPending(false);
        });
    }
  };
  return (
    <animated.div style={fade}>
      <div className="form-section">
        <h1>Signup</h1>
        <div style={styles.wrapper}>
          <div>{isPending && "Loading..."}</div>
          <form className="signup-login" style={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input className="input-font"
              type="text"
              name="username"
              id="username"
              value={formState.username}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="password">Password</label>
            <input className="input-font"
              type="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={handleInputChange}
            />
            <button type="submit" style={styles.submitButton}>
              Submit
          </button>
          </form>
        </div>
      </div>
      <img
        className="plantImageTwo"
        src={leaves}
        alt="plant-ahead-welcome"
      ></img>
    </animated.div>
  );
}
export default SignupPage;
