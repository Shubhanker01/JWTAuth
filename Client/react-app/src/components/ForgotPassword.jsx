import { useState } from "react"
import { Link } from "react-router-dom"
import { StatusAlertService } from "react-status-alert"
const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confPassword,setconfPassword] = useState("")

    const forgotPass = async(e)=>{
        e.preventDefault()
        if(password!=confPassword){
           StatusAlertService.showError("Password not matching")
        }
        else{
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
               }
               
               let bodyContent = `email=${email}&password=${password}`;
               
               let response = await fetch("http://localhost:3000/forgotpassword", { 
                 method: "POST",
                 body: bodyContent,
                 headers: headersList
               });
               if(response.status==403){
                StatusAlertService.showError("Invalid Email")
               }
               else{
                let data = await response.text()
                StatusAlertService.showSuccess(data)
               }
               setEmail("")
               setPassword("")
               setconfPassword("")
        }
    }
    return (
        <>
            <div className="signup-form">
                <form onSubmit={forgotPass}>
                    <h1>Forgot Password</h1>
                    <div>
                        <label htmlFor="email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                        </label>
                        <input type="email" name="email" placeholder="Your Email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                    </div>

                    <br></br>
                    <div>
                        <label htmlFor="password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </label>
                        <input type="password" name="password" placeholder="Your Password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="conf-password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </label>
                        <input type="password" name="password" placeholder="Confirm Password" id="conf-password" value={confPassword} onChange={(e) => { setconfPassword(e.target.value) }} required></input>
                    </div>
                    <br/>
                    <button type="submit">Reset Password</button>
                    <br></br>
                    <p>New User? Go To <Link to="/">Registration</Link></p>
                    <p>Want to login? Go To <Link to="/login">Login</Link> </p>
                </form>
            </div>

        </>
    )
}
export default ForgotPassword