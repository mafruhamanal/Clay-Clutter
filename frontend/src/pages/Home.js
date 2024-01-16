import { useEffect } from "react";
import { useCeramicsContext } from "../hooks/useCeramicsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import CeramicDetails from "../components/CeramicDetails";
import CeramicForm from "../components/CeramicForm";

const Home = () => {
  const { ceramics, dispatch } = useCeramicsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCeramics = async () => {
      const response = await fetch("/api/ceramics", {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CERAMICS", payload: json });
      }
    };

    if (user) {
      fetchCeramics();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="ceramics">
        {ceramics &&
          ceramics.map((ceramic) => (
            <CeramicDetails ceramic={ceramic} key={ceramic._id} />
          ))}
      </div>
      <CeramicForm />
    </div>
  );
};

export default Home;
