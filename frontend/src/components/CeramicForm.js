import { useState } from "react";
import { useCeramicsContext } from "../hooks/useCeramicsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const CeramicForm = () => {
  const { dispatch } = useCeramicsContext();
  const { user } = useAuthContext()
  
  const [title, setTitle] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const ceramic = { title, dimensions, weight };

    const response = await fetch("/api/ceramics", {
      method: "POST",
      body: JSON.stringify(ceramic),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setDimensions("");
      setWeight("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_CERAMIC", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Piece</h3>

      <label>Piece Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Dimensions:</label>
      <input
        type="text"
        onChange={(e) => setDimensions(e.target.value)}
        value={dimensions}
        className={emptyFields.includes("dimensions") ? "error" : ""}
      />

      <label>Weight (kg):</label>
      <input
        type="number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
        className={emptyFields.includes("weight") ? "error" : ""}
      />

      <button>Add Piece</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CeramicForm;
