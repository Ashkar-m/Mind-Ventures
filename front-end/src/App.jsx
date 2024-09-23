import './App.css'
import UserRouting from './routing/userRouting'
import ToastProvider from './components/toastProvider/toastProvider'
import MentorRouting from './routing/mentorRouting'
import AdminRouting from './routing/adminRouting'

function App() {

  return (
     <div>
      <UserRouting />
      <MentorRouting />
      <AdminRouting />
      <ToastProvider />
     </div>
  )
}

export default App
