import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthorized } from "../../store/authSlice";

const CardDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAuthorized())
    navigate('/')
  }

    return (
      <div>
        <h1 onClick={() => handleClick()}>Card Details</h1>
      </div>
    )
  }
  
  export default CardDetails