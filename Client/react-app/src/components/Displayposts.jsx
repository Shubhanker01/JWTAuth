import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Post from "./Post"

const Displayposts = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function getPosts() {
      let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
      }

      let response = await fetch("https://jwtauthbackend-62mq.onrender.com/getposts", {
        method: "GET",
        headers: headersList
      });

      let data = await response.json()
      return data
    }
    getPosts().then(res => setPosts(res)).catch(err => console.log(err))
  }, [posts])
  return (
    <>
      <div className="main-1">
        <Navbar />
        <div className="main-p">
          {posts.length == 0 ?
            <h1 className="text-center">No posts to display</h1> :
            <div className="posts">
              {posts.map(function (post) {
                return <Post key={post._id} caption={post.caption} description={post.description} likes={post.likes} id={post._id}/>
              })}

            </div>}


        </div>
      </div>
    </>
  )
}
export default Displayposts