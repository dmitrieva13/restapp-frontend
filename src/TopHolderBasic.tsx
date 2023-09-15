import { useNavigate } from 'react-router-dom'
import './style/TopHolderBasic.css'

function TopHolderBasic() {
  const navigate = useNavigate()

  let goToUser = () => {
      navigate("/user/" + localStorage.username)
  }

  let goToLogin = () => {
      navigate("/login")
  }

  let goToMain = () => {
    navigate("/")
  }

  if (localStorage.username) {
    return (
      <div className='topBlockAll'>
          <div className="appTitle" onClick={goToMain}>RestApp</div>
          <div className="user" onClick={goToUser}>{localStorage.username}</div>
      </div>
    )
  } else {
    return (
        <div className='topBlockAll'>
            <div className="appTitle" onClick={goToMain}>RestApp</div>
            <div className="user" onClick={goToLogin}>Войти</div>
        </div>
    )
  }
}

export default TopHolderBasic