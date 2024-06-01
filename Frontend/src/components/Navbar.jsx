import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div>
        <h1>Channels</h1>
        <Link to="/chat">Sala de chat</Link>
    </div>
  )
}

export default Navbar