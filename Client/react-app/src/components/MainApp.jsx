import { useState } from "react"
import Navbar from "./Navbar"
import { StatusAlertService } from "react-status-alert"

const MainApp = () => {
    const [caption, setCaption] = useState("")
    const [description, setDescription] = useState("")

    const addPost = async () => {
        if (caption == "" || description == "") {
            StatusAlertService.showError("please enter all the fields")
        }
        else {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/x-www-form-urlencoded"
            }

            let bodyContent = `caption=${caption}&description=${description}&token=${localStorage.getItem("refreshToken")}`;

            let response = await fetch("http://localhost:3000/post", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            if (response.status == 403) {
                let data = await response.text()
                StatusAlertService.showError(data)
            }
            else {
                let data = await response.text();
                StatusAlertService.showSuccess(data)
            }

            setCaption("")
            setDescription("")
        }

    }
    return (
        <>
            <div className="main">
                <Navbar />
                <h1>Add your posts</h1>
                <div className="add-post">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Caption</label>
                        <br></br>
                        <input value={caption} onChange={(e) => setCaption(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your Caption" />
                    </div>
                    <br />
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <br></br>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Your Description"></textarea>
                    </div>
                    <button type="button" class="btn btn-dark" onClick={addPost}>Add Post</button>

                </div>
            </div>


        </>
    )
}
export default MainApp