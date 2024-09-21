import './App.css'
import UserRouting from './routing/userRouting'
import ToastProvider from './components/toastProvider/toastProvider'
import MentorRouting from './routing/mentorRouting'

function App() {

  return (
     <div>
      <ToastProvider />
      <UserRouting />
      <MentorRouting />
     </div>
  )
}

export default App
