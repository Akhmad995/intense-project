import { useNavigate } from "react-router-dom";

type CardDetailsProps = {
  setAuthorized : (authorized: boolean) => void
}

const CardDetails = (props: CardDetailsProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    props.setAuthorized(false);
    localStorage.setItem('authorized', 'false')
    navigate('/')
  }

    return (
      <div>
        <h1 onClick={() => handleClick()}>Card Details</h1>
      </div>
    )
  }
  
  export default CardDetails