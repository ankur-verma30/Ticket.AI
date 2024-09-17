import './App.css'
import TicketAI from './Component/TicketAI.jsx'
import TravelAILogin from './Component/TravelAILogin.jsx'
import SignUp from './Component/SignUp.jsx'
import { Routes,Route } from 'react-router-dom'
import EnhancedPhoneLogin from './Component/EnhancedPhoneLogin.jsx'



function App() {
  return (
     <Routes>
      <Route path="/" element={<SignUp />}/>
      <Route path='/sign-in' element={<TravelAILogin />}/>
      <Route path='/chat-section' element={<TicketAI />}/>
      <Route path ='/phone-login' element={<EnhancedPhoneLogin />}/>
      
   
     </Routes>
     
  )
}

export default App
