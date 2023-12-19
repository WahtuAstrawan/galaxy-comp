import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login", {replace: true});
    }

  return (
    <div>
        <button onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}
