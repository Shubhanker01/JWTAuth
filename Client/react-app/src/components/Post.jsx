import { useState } from "react"
import { StatusAlertService } from "react-status-alert"
import Comments from "./Comments"

const Post = ({ caption, description, likes, id }) => {
    const [updateTitle, setUpdateTitle] = useState(caption)
    const [updateDescription, setUpdateDescription] = useState(description)
    const [like, setAlreadyLiked] = useState(false)
    const [individualComment, addindividualComment] = useState("")

    const updatePost = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        let bodyContent = `caption=${updateTitle}&description=${updateDescription}`;

        let response = await fetch(`https://jwtauthbackend-62mq.onrender.com/update/${id}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        StatusAlertService.showSuccess(data)
    }

    const deletePost = async () => {
        let headersList = {
            "Accept": "*/*"
        }
        let response = await fetch(`https://jwtauthbackend-62mq.onrender.com/delete/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        let data = await response.text();
        StatusAlertService.showSuccess(data)
    }

    const likePost = async () => {
        if (like == false) {
            let headersList = {
                "Accept": "*/*"
            }

            let response = await fetch(`https://jwtauthbackend-62mq.onrender.com/likes/${id}`, {
                method: "POST",
                headers: headersList
            });

            let data = await response.text();
            StatusAlertService.showInfo(data)
            setAlreadyLiked(true)

        }
        else {
            let headersList = {
                "Accept": "*/*"
            }
            let response = await fetch(`https://jwtauthbackend-62mq.onrender.com/unlike/${id}`, {
                method: "POST",
                headers: headersList
            });

            let data = await response.text();
            StatusAlertService.showInfo(data)
            setAlreadyLiked(false)
        }

    }

    const addComment = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        let bodyContent = `comment=${individualComment}`;
        let response = await fetch(`https://jwtauthbackend-62mq.onrender.com/comments/${id}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        StatusAlertService.showSuccess(data)
        addindividualComment("")
    }

    return (
        <>
            <div className="card text-bg-dark mt-5 mb-3 w-75 mx-auto">
                <div className="card-header">{caption}</div>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                    <div className="w-full">
                        <button onClick={likePost} type="button" className="btn btn-info">{likes} Likes</button>
                        <button className="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target={`#commentModal${id}`} id={`comment${id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </button>
                        <div className="modal fade" id={`commentModal${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content text-bg-dark">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5">Add Comment</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Description</label>
                                            <textarea onChange={(e) => addindividualComment(e.target.value)} value={individualComment} className="form-control" id="message-text"></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button onClick={addComment} type="button" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target={`#deleteModal${id}`} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg></button>
                        <div class="modal fade" id={`deleteModal${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content text-bg-dark">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5">Delete Post</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete this post
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button onClick={deletePost} type="button" class="btn btn-primary" data-bs-dismiss="modal">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`} data-bs-whatever="@mdo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                        </button>

                        <div className="modal fade" id={`exampleModal${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content text-bg-dark">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Caption</label>
                                            <input value={updateTitle} onChange={(e) => { setUpdateTitle(e.target.value) }} type="text" class="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Description</label>
                                            <textarea value={updateDescription} onChange={(e) => { setUpdateDescription(e.target.value) }} className="form-control" id="message-text"></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updatePost}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#comments${id}`} aria-expanded="false" aria-controls="collapseExample">
                    Comments
                </button>

                <div className="collapse" id={`comments${id}`}>
                    <div className="card card-body text-bg-dark">
                        <Comments key={id} id={id} />
                    </div>
                </div>
            </div>

        </>
    )
}
export default Post