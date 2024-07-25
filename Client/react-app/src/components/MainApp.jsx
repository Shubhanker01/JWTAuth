import { useLocation } from "react-router-dom"
const MainApp = () => {
    const location = useLocation()
    const data = location.state
    return (
        <>
            <h1>Welcome to Main Page</h1>
            <div className="card text-center w-50">
                <div className="card-header">
                    Your Profile
                </div>
                <div className="card-body">
                    <h5 className="card-title">{data.username}</h5>
                    <p className="card-text">{data.email}</p>
                </div>
            </div>
        </>
    )
}
export default MainApp