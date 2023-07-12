import { useState } from "react"
import useUserName from "../hooks/userHooks"
import '../styles/loadername.css'

const LoaderName = () => {
  const context = useUserName()
  const name = context?.name
  console.log(!name)
  const updateNameHandler = context?.updateNameHandler
  const [showForm, setShowForm] = useState<boolean>(true)
  const [formName, setFormName] = useState<string>("")

  const submitNameHandler = () => {
    console.log(formName)
    setShowForm(!showForm)
    updateNameHandler && updateNameHandler(formName)
  }
  return (
    <div className={`absolute border border-[#ab886d] bg-white p-8 rounded-lg z-10 ${!showForm || name ? 'hidden' : ''}`}>
      <div className="mx-auto flex flex-col items-center justify-center rounded-full">
        <p className="font-base text-gray-600 mb-2">Tell us your name</p>
        <input type="text" id="name" value={formName} className="shadow-lg py-2 px-4 rounded w-full focus:outline-none border border-[#ab886d]" placeholder="Ano ang iyong pangalan?" onChange={(e) => setFormName(e.target.value)}/>
        <button className={`border-[#ab886d] text-gray-600 border shadow-lg bg-gray-100 py-2 px-4 rounded hover:bg-[#f2e0cb] hover:text-white w-[50%] loader-button mt-6 ${!formName ? 'cursor-not-allowed' : ''}`} onClick={submitNameHandler} disabled={!formName ? true : false}>Done</button>
      </div>
    </div>
  )
}

export default LoaderName