import { useState, useEffect } from "react";
import { fetchData  } from "../services/api";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        let isMounted = true;
        fetchData(url)
        .then((response)=> { if(isMounted) setData(response)})
        .catch((error)=> {if(isMounted) setError(error)})
        .finally(()=> {if(isMounted) setIsLoading(false)});

        return () => { isMounted = false }
    }, [url]);

    return { data, error, isLoading }
}