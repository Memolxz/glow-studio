import './Login.css';

export default function Login() {
    return (
        <div className="container">
        <div className="form-box login">
            <form>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required />
                <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
                <input type="password" placeholder="Password" required />
                <i className="bx bxs-lock-alt"></i>
            </div>

            {/* <div className="forgot-link">
                <a href="#">Forgot Password?</a>
            </div> */}

            <button type="submit" className="btn">Login</button>
            </form>
        </div>
        </div>
    );
}
