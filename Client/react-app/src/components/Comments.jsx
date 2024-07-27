import { useState, useEffect } from "react"
import IndividualComment from "./IndividualComment"
const Comments = ({ id }) => {
    const [comments, getComments] = useState([])
    useEffect(() => {
        async function getuserComments() {
            let headersList = {
                "Accept": "*/*"
            }

            let response = await fetch(`https://jwtauthbackend-62mq.onrender.com/showcomments/${id}`, {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            return data

        }
        getuserComments().then((res) => getComments(res)).catch((err) => console.log(err))
    }, [comments])
    return (
        <>
            {
                comments.length == 0 ?
                    <p>No comments to display</p> :
                    <div>
                        {
                            comments.map(function (comm) {
                                return <IndividualComment key={comm.id} comment={comm.comment} />
                            })
                        }
                    </div>
            }


        </>
    )
}
export default Comments