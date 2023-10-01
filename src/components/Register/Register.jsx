import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const Register = () => {

    const { registerUser } = useContext(AuthContext);

    const [handleSuccess, setHandleSuccess] = useState('');

    const [handleError, setHandleError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    // const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const condition = e.target.checkbox.checked;
        setHandleSuccess('');
        setHandleError('');

        console.log(condition, name, email, password);

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

        registerUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                sendEmailVerification(user)
                .then(()=> {
                    alert('Please Verify Your Email!')
                })
                setHandleSuccess('Successfully Created an Account')
            })
            .catch(error => {
                const message = error.message;
                console.error(error);
                setHandleError(message);
            })
        // e.target.reset();
        // navigate('/login');
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your Name" name="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Your Email" name="email" className="input input-bordered" required />
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
                                    <button className="btn btn-danger">Register</button>
                                </div>
                            </form>
                            <div className="text-center my-2">
                                {
                                    handleError && <p className="text-red-500">{handleError}</p>
                                }
                                {
                                    handleSuccess && <p className="text-green-600">{handleSuccess}</p>
                                }
                            </div>
                            <p>Already have any account? Please <NavLink
                                to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "" : "underline text-blue-500"
                                }
                            >
                                Login
                            </NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;