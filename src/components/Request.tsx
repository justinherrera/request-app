import { useState, ChangeEvent, useEffect } from 'react'
import { CheckIcon, UserIcon, PencilSquareIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import '../styles/request.css'
import Confirmation from './Confirmation'
import useUserName from "../hooks/userHooks"
import { Suggestion, FormValue, FormError } from '../types/Request'


function Request() {
  const user = useUserName()
  const name = user?.name
  console.log(name)
  const users = [
    {
      name: "Mohses",
      phone: "+639532179866"
    },
    {
      name: "Erika",
      phone: "+639977115110"
    },
    {
      name: "Seann",
      phone: "+639300790554"
    },
    {
      name: "Aden",
      phone: "+639163910089"
    },
    {
      name: "Lei",
      phone: "+639562852067"
    },
    {
      name: "Jen",
      phone: "+639393808586"
    },
    {
      name: "Dano",
      phone: "+639554862060"
    },
    {
      name: "Kyla",
      phone: "+639054884106"
    },
    {
      name: "Alecxa",
      phone: "+639552806484"
    }
  ]
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    about: "",
    urgency: ""
  })

  const [formError, setFormError] = useState<FormError>({
    name: "",
    about: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formMessage, setFormMessage] = useState(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFormValue({ ...formValue, urgency: event.target.value }) ;
  };

  const handleChange = (value: string) => {
    setFormValue({ ...formValue, name: value })
    const response = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()))
    if (value.length === 0) {
      return setSuggestions([])
    }
    setSuggestions(response)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const emptyName = formValue.name.length === 0
    const emptyAbout = formValue.about.length === 0

    if (emptyName && emptyAbout) {
      setFormError({ name: 'oops.. so wala kang papakiusapan? 😒', about: 'oops.. so wala kang ipapakiusap? 😒' })
    } else if (emptyName) {
      setFormError({ ...formError, name: 'oops.. so wala kang papakiusapan? 😒' })
    } else if (!selectedName) {
      setFormError({ ...formError, name: 'oops.. parang wala pa sya sa listahan? 🤔' })
    } else if (emptyAbout) {
      setFormError({ ...formError, about: 'oops.. so wala kang ipapakiusap? 😒' })
    } else {
      setFormError({
        name: "",
        about: "",
      })

      setIsLoading(true)

      const user = users.find((user) => user.name === formValue.name)

      const userNumber = user?.phone

      console.log("sending request...")

      let url = "http://localhost:3000/api/sendSMS"
      const host = window.location.hostname

      if (host !== "localhost") {
        url = "https://marca-pina-request-justinherrera.vercel.app/api/sendSMS"
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: userNumber, body: `Si ${name} ito, ${formValue.about}` }),
      });
  
      const data = await res.json();

      console.log(data)

      setIsLoading(false)
      console.log(isLoading)

      setFormMessage(data.message)

      setFormValue({
        name: "",
        about: "",
        urgency: ""
      })
    }
  }

  useEffect(() => {
    if (formMessage) {
      setTimeout(() => {
        setFormMessage(null)
      }, 1500)
    }
  }, [formMessage])


  return (
    <div className={` ${!name ? 'hidden' : ''} flex items-center justify-center`}>
      { formMessage ? <Confirmation status={formMessage} /> : <></> }
      <div className={`form-div bg-white md:rounded-2xl shadow w-screen md:w-[30vw] md:border-[#ab886d] border ${formMessage ? "hidden" : ""}`}>
        <div className="border-[#ab886d] border-b py-6 px-8">
          <p className="request-header text-xl font-base text-gray-600">Marca Pina E-PakiusApp</p>
        </div>
        <div className="my-4 mx-8">
          <div className="flex">
            <UserIcon className="h-6 w-4 mr-2" />
            <label htmlFor="name" className="text-gray-600 text-left font-medium mb-2 block">Name</label>
          </div>
          <input type="text" id="name" value={formValue.name} className={`shadow-lg p-2 rounded w-full focus:outline-none border ${formError.name ? 'border-red-400' : 'border-[#ab886d]'}`} placeholder="Pangalan ng nais mo kontakin" onChange={(e) => handleChange(e.target.value)}/>
          <small className="text-red-400 font-medium">{formError.name}</small>
          {(formValue.name.length > 0 && suggestions.length > 0) && (
            <div className={`mt-2 shadow-lg rounded bg-white border-gray-200 border ${suggestions.length === 0 && 'transition-opacity duration-500 opacity-0'}`}>
              <ul className="">
                {suggestions.map(suggestion => (
                  <li
                    className="p-2 group text-gray-600 hover:bg-blue-500 hover:text-white cursor-pointer flex justify-between"
                    onClick={(e) => { 
                      e.preventDefault()
                      setFormValue({ ...formValue, name: suggestion.name })
                      setSelectedName(suggestion.name)
                      setFormError({ ...formError, name: "" })
                      setTimeout(() => {
                        setSuggestions([])
                      }, 500);
                      }}
                    key={suggestion.phone}
                  >
                    <p>{suggestion.name}</p>
                    { formValue.name === suggestion.name && <CheckIcon className="h-6 w-6 text-blue-500 group-hover:text-white" /> }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-4 mx-8">
          <div className="flex">
            <PencilSquareIcon className="h-6 w-4 mr-2" />
            <label htmlFor="name" className="text-gray-600 text-left font-medium mb-2 block">About</label>
          </div>
          <textarea id="about" className={`shadow-lg p-2 rounded w-full focus:outline-none border ${formError.about ? 'border-red-400' : 'border-[#ab886d]'}`} placeholder={`Ano ang nais mo ipakiusap, ${name}?`} value={formValue.about} onChange={(e) => {
            setFormValue({ ...formValue, about: e.target.value })
            setFormError({ ...formError, about: "" })
          }}></textarea>
          <small className="text-red-400 font-medium">{formError.about}</small>
        </div>
        <div className="mb-4 mx-8">
          <div className="flex">
            <ExclamationCircleIcon className="h-6 w-4 mr-2" />
            <label htmlFor="name" className="text-gray-600 text-left font-medium mb-2 block">Urgency</label>
          </div>
          <select id="priority" className="border-[#ab886d] border shadow-lg p-2 rounded w-full text-gray-600 focus:outline-none" value={formValue.urgency} onChange={handleOptionChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4 mx-8 flex justify-center items-center">
          <button className={`border-[#ab886d] text-gray-600 border shadow-lg bg-gray-100 py-2 px-4 my-6 rounded hover:bg-[#f2e0cb] hover:text-white w-[50%] ${isLoading ? 'cursor-progress': 'cursor-pointer'}`} onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Sending..." : "Send"}</button>
        </div>
      </div>
    </div>
  )
}

export default Request
