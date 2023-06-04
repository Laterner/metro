import { Link } from "react-router-dom";


export default function Main(){
    return (
        <ul>
            <li><Link to="login">Login</Link></li>
            <li><Link to="register">Register</Link></li>
            <li><Link to="send">Send</Link></li>
            <li><Link to="admin">Admin</Link></li>
        </ul>
    )
}