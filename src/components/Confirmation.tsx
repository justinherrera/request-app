import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import "../styles/confirmation.css"

const Confirmation = ({ status }: { status: string }) => {
  const message = status === "success" ? "Your message was sent!" : "There was a problem sending your message!"
  const success = status === "success"
  return (
    <div className="absolute border border-[#ab886d] bg-white p-8 rounded-lg z-10">
      <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-${success ? "green" : "red"}-100`}>
        { success ? (
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          ) : <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        }
      </div>
      <p className="mt-2 font-base text-gray-600">{message}</p>
    </div>
  )
}

export default Confirmation