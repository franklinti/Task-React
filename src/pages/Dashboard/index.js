
import { useContext } from "react";
import { AuthContext } from "../../context/auth";


function Dashboard() {
    const { signOut } = useContext(AuthContext);

    return (
        <div>
           <span>Dashboard</span> <br></br>
            <button onClick={signOut}>Sair</button>

        </div>
    )
}
export default Dashboard;