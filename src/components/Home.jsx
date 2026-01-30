import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  // 🔐 STRONG GUARD: Home load hote hi check
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // Agar token nahi hai, to kuch bhi render mat karo
  if (!localStorage.getItem("token")) {
    return null;
  }

  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
