import React,  { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import axios from "axios";

const Candidates = ({host}) => {

    const [candidates, setCandidates] = useState([]),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(null);

    const deleteUser = (id) => {
        setCandidates(candidates.filter((el) => el.id !== id))
            }
    
        useEffect(() => {
    
            const fetchCandidates = async () => {
    
                try {const response = await axios.get(`${host}/api/Candidates?populate=*`);
    
                setCandidates(response.data.data);} 
                catch (error) {setError(error);} 
                finally {setLoading(false);}
            };
    
            fetchCandidates();
        }, [host]);
    
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>

        return (
            <>
                <CandidateCard candidates= {candidates} deleteUser={deleteUser} host={host}/>
            </>
        )
}

export default Candidates
