import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserLoginRequiest } from "../apiRequiest/apiRequiest";
import { IsEmpty } from "../Helper/FormHelper";
import { setToken, setUserDetails } from "../Helper/SessionHelper";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [load, setLoaded] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  const onLogin = async () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (IsEmpty(email)) {
      toast.error("Invalid email address!");
    } else if (IsEmpty(pass)) {
      toast.error("Password Required!");
    } else {
      try {
        setLoaded(true);
        const res = await UserLoginRequiest(email, pass);
        setLoaded(false);

        if (res.status === 200) {
          if (res.data.message === "Username or password invalid") {
            toast.error("Username or password invalid", { duration: 1000 });
          }
          else if (res.data.message === "User account has been deactivated, contact the administrator") {
            toast.error("User account has been deactivated, contact the administrator", { duration: 4000 });
          }
          else {
            setToken(res.data["token"]);
            setUserDetails(res.data["data"]);
            toast.success("Login Success", { duration: 1000 });
            window.location.href = "/";
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
        setLoaded(false);
      }
    }
  };

  if (load) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <BeatLoader
          color="#0866FF"
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <Fragment>
      <Toaster position="top-right"
        toastOptions={{
          duration: 1000,
        }}
      />
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg border-0">
                <div className="login__body card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="login__heading mb-2">Welcome Back</h2>
                    <p className="text-muted">Sign in to your account</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onLogin();
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <input
                        ref={emailRef}
                        id="email"
                        type="email"
                        className="input__login form-control w-100 form-control-lg fs-6"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Password
                      </label>
                      <input
                        ref={passRef}
                        id="password"
                        type="password"
                        className="input__login form-control w-100 form-control-lg fs-6"
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div className="d-grid mb-4">
                      <button
                        type="submit"
                        className="commonBtn fs-6"
                        disabled={load}
                      >
                        {load ? "Signing In..." : "Sign In"}
                      </button>
                    </div>
                  </form>

                  <div className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                      <Link
                        to="/register"
                        className="text-decoration-none text-dark fw-semibold"
                      >
                        Create Account
                      </Link>
                      <span className="text-muted">|</span>
                      <Link
                        to="/forgot-password"
                        className="text-decoration-none text-dark fw-semibold"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
