import React from "react";
import Candidate from "./Candidate";


const Candidates = ({candidates, deleteUser, host, type, currentUser}) => {
      
    if (candidates.length  > 0)   
          
      return (

        <div className="candidate">
            {candidates.map((el) => (
              <Candidate 
                onDelete={deleteUser} 
                key={el.id} 
                candidate={el} 
                host={host}
                type={type}
                currentUser={currentUser}
              />
            ))}
        </div>

      )

      else  return (

        <div className="card">
          <h3>Кандидатів немає</h3>
        </div>
        
      )

}
  export default Candidates