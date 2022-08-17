import { useContext } from "react";
import Header from "../../Components/Header";
import { AuthContext } from "../../context/auth";

function Dashboard() {
    const { signOut } = useContext(AuthContext);

    return (
        <div>
            <Header />
            <span>Dashboard</span>
        </div>
    )
}
export default Dashboard;