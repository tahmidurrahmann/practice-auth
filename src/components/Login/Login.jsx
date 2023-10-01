import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../Firebase/Firebase.config";

const Login = () => {

    const { signInUser, googleSignIn, githubSignIn } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [handleSuccess, setHandleSuccess] = useState('');

    const [handleError, setHandleError] = useState('');

    // const navigate = useNavigate();

    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const condition = e.target.checkbox.checked;
        // e.target.reset();
        setHandleError('');
        setHandleSuccess('');
        // navigate('/')
        console.log(email, password);
        if (password.length < 6) {
            setHandleError('Password should be at least 6 characters (auth/weak-password)');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setHandleError('Please provide A Capital Letter in your password');
            return;
        }
        else if (!condition) {
            setHandleError('Please read Terms & Conditions');
            return;
        }
        signInUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                if(result.user.emailVerified){
                    setHandleSuccess('Successfully sign in')
                }
            })
            .catch(error => {
                const message = error.message;
                console.error(message);
                setHandleError(message)
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if(!email) {
            alert('Give an Email Address');
            return;
        }

        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            alert('Please Provide an Valid Email Address');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Check Email Verification')
            })
            .catch(() => {
                setHandleError('please give valid email')
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" ref={emailRef}
                                        placeholder="Your Email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"}
                                            placeholder="Your Password" name="password" className="input input-bordered w-full" required />
                                        <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                        </span>
                                    </div>
                                </div>
                                <label className="label">
                                    <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <div className="flex gap-5 mt-5">
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="checkbox">Read <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "" : "underline text-blue-500"
                                        }
                                    >
                                        Terms & Condition
                                    </NavLink></label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-danger">Login</button>
                                </div>
                            </form>
                            <button onClick={handleGoogleSignIn} className="btn my-2 btn-danger">Sign in With <span><FcGoogle></FcGoogle></span></button>
                            <button onClick={handleGithubSignIn} className="btn btn-danger">Sign in With <span><AiFillGithub></AiFillGithub></span></button>
                            <p>Have not any account? Please <NavLink
                                to="/register"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "" : "underline text-blue-500"
                                }
                            >
                                Register
                            </NavLink></p>
                        </div>
                        <div className="text-center mb-6">
                            {
                                handleError && <p className="text-red-500">{handleError}</p>
                            }
                            {
                                handleSuccess && <p className="text-green-600">{handleSuccess}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;