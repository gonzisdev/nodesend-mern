import AppContext from "../context/appProvider"
import { useContext} from "react"

const useApp = () => {
    return useContext(AppContext)
}

export default useApp