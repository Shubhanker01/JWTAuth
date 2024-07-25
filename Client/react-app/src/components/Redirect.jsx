import { useNavigate } from "react-router-dom";
import { StatusAlertService } from "react-status-alert";

const Redirect = () => {
    const navigate = useNavigate()
    const getUserInfo = async () => {
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${document.getElementById('tokeninp').value}`
        }

        let response = await fetch("http://localhost:3000/getuserinfo", {
            method: "GET",
            headers: headersList
        });
        if (response.status == 403 || response.status == 401) {
            let data = await response.text();
            StatusAlertService.showError(data)
            localStorage.removeItem("secret")
        }
        else {
            let data = await response.json()
            navigate('/main-app', { state: data })
            StatusAlertService.showSuccess("Successfully logged in")
        }

    }
    return (
        <>
            <div className="redirect-div">
                <p>Continue to the click the button below to authenticate. This token will expire in 60s. Incase token is expired login once again</p>
                <div className="inputgp">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Token</span>
                        <input id="tokeninp" defaultValue={localStorage.getItem("token")} type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button type="button" onClick={getUserInfo} className="btn btn-light">Continue</button>
                </div>
            </div>
        </>
    )
}
export default Redirect