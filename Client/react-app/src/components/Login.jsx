import { Link } from "react-router-dom"
const Login = () => {
    return (
        <>
            <div className="signup-form">
                <form>
                    <h1>Login Form</h1>
                    <div>
                        <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                        </label>
                        <input type="email" placeholder="Your Email" id="email" required></input>
                    </div>

                    <br></br>
                    <div>
                        <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </label>
                        <input type="password" placeholder="Your Password" id="password" required></input>
                    </div>
                    <br></br>
                    <button type="submit">Login</button>
                    <br></br>
                    <p>New User? Go To <Link to="/">Registration</Link></p>
                </form>
            </div>
        </>
    )
}
export default Login