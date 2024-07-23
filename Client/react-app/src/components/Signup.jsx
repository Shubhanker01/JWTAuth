import { useState } from "react"
import { Link } from "react-router-dom"
import { StatusAlertService } from "react-status-alert"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword,setconfPassword] = useState("")
    const formSend = async (e) => {
        e.preventDefault()
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        let bodyContent = `username=${username}&email=${email}&password=${password}`;

        let response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        StatusAlertService.showSuccess(data)
    }
    return (
        <>
            <div className="signup-form">
                <form onSubmit={formSend}>
                    <h1>SignUp Form</h1>
                    <div>
                        <label for="username">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                        </label>
                        <input type="text" placeholder="Your Name" id="username" name="username" onChange={(e) => { setUsername(e.target.value) }} value={username} required></input>
                    </div>


                    <br></br>
                    <div>
                        <label for="email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                        </label>
                        <input type="email" placeholder="Your Email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required></input>
                    </div>

                    <br></br>
                    <div>
                        <label for="password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </label>
                        <input type="password" placeholder="Your Password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} required></input>
                    </div>
                    <br></br>
                    <div>
                        <label for="confirm-password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </label>
                        <input type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password" onChange={(e)=>{setconfPassword(e.target.value)}} value={confPassword} required></input>
                    </div>

                    <br></br>
                    <button type="submit">Register</button>
                    <br></br>
                    <p>Already Registered? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </>
    )
}
export default Signup