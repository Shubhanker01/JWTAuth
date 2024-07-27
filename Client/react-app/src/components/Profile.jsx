import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import { useLocation, useNavigate } from "react-router-dom";
import { StatusAlertService } from "react-status-alert";

const Profile = () => {
    const [email, showEmail] = useState("")
    const [name, showName] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        async function getDetails() {
            let headersList = {
                "Accept": "*/*",
                "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
            }

            let response = await fetch("http://localhost:3000/userprofile", {
                method: "GET",
                headers: headersList
            });

            if (response.status == 403) {
                let data = await response.text()
                return data
            }
            else {
                let data = await response.json()
                return data
            }

        }
        getDetails().then((res) => {
            showEmail(res.email)
            showName(res.username)
        })
    }, [])

    const logout = () => {
        navigate('/')
        localStorage.removeItem("refreshToken")
        StatusAlertService.showInfo("You have successfully logged out")
    }
    return (
        <>
            <div className="main">
                <Navbar />
                <div className="profile">
                    <div className="card text-center bg-dark">
                        <div className="card-header text-light">
                            Your Profile
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-light">{name}</h5>
                            <p className="card-text text-light">{email}</p>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Logout
                            </button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Log Out</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure you want to Logout?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={logout}>Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile