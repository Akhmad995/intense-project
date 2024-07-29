import { useNavigate } from "react-router-dom";

const CardDetails = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    props.setAuthorized(false);
    navigate('/')
    localStorage.setItem('authorized', 'false')
  }

    return (
      <div>
        <h1 onClick={() => handleClick()}>Card Details</h1>
      </div>
    )
  }
  
  export default CardDetails