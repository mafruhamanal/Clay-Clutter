import { useCeramicsContext } from "../hooks/useCeramicsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const CeramicDetails = ({ ceramic }) => {
  const { dispatch } = useCeramicsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch("/api/ceramics/" + ceramic._id, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CERAMIC", payload: json });
    }
  };

  return (
    <div className="ceramic-details">
      <h4>{ceramic.title}</h4>
      <p>
        <strong>Dimensions: </strong>
        {ceramic.dimensions}
      </p>
      <p>
        <strong>Weight (kg): </strong>
        {ceramic.weight}
      </p>
      <p>{formatDistanceToNow( new Date(ceramic.createdAt), {addSuffix: true})}</p>
      <span className= 'material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  );
};

export default CeramicDetails;
