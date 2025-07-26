import { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";

const Candidates = ({host, axios, type, currentUser, candidates, setCandidates}) => {


    const [loading, setLoading] = useState(true),
          [error, setError] = useState(null);

    const deleteUser = (id) => {
        setCandidates(candidates.filter((el) => el.id !== id))
            }
    
        useEffect(() => {
    
            const fetchCandidates = async () => {
    
                try {const response = await axios.get(`${host}/api/Candidates?[populate][foto]=true`);
    
                setCandidates(response.data.data);} 
                catch (error) {setError(error);} 
                finally {setLoading(false);}
            };
    
            fetchCandidates();
        }, [host, axios, setCandidates]);
    
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>

        return (
            <>
                <CandidateCard 
                    candidates={candidates}
                    deleteUser={deleteUser}
                    host={host}
                    type={type}
                    currentUser={currentUser}
                />
            </>
        )
}

export default Candidates
