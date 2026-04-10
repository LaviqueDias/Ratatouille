import { useState } from "react"

export default function platesServices() {
    const [platesLoading, setPlatesLoading] = useState(false)
    const [refetchPlates, setRefetchPlates] = useState(true)
    const [platesList, setPlatesList] = useState([])

    const url = `${import.meta.env.VITE_API_URL}/plates`

    const getAvailablePlates = (userId) => {
        setPlatesLoading(true)
        
        fetch(`${url}/availables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success) {
                setPlatesList(result.body)
            } else {
                console.log(result)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setPlatesLoading(false)
            setRefetchPlates(false)
        })
    }

    return { getAvailablePlates, platesLoading, refetchPlates, platesList }
}