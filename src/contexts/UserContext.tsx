import { useState, createContext, ReactNode } from "react"

type ChildrenProps = {
  children: ReactNode;
};

type UserContextValue = {
  name?: string;
  updateNameHandler: (newName: string) => void;
};

const UserContext = createContext<UserContextValue | null>(null)

const UserProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [name, setName] = useState<string | undefined>("")

  const updateNameHandler = (newName: string): void => {
    console.log("updateNameHandler")
    console.log(newName)
    setName(newName)
  }

  return (
    <UserContext.Provider value={{ name, updateNameHandler }} >
      { children }
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }