import Request from "./components/Request";
import LoaderName from "./components/LoaderName";
import { UserProvider } from "./contexts/UserContext";
import useUserName from "./hooks/userHooks";
import './App.css'

function App() {

  const context = useUserName()
  console.log(context === null)
  return (
    <div className="App flex flex-col justify-center items-center bg-[#f5e1ce] h-screen">
      <UserProvider>
        <LoaderName />
        <Request />
        
      </UserProvider>
      <small className="text-gray-400 mt-4">©2023 Marca Pina. All rights reserved.</small>
    </div>
  )
}

export default App
