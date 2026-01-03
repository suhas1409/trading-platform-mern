import "./dashboard.scss"
import { Overview } from '../../components/overview/Overview'
import { useAuth } from '../../context/AuthContext.jsx'

export const Dashboard = () => {

  const {user, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <div className="overviewSection">
        <Overview user={user}/>
      </div>
    </div> 
  )
}