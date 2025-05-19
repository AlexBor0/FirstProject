import React from "react";
import Candidate from "./Candidate";
import './../css/ItemCard.css';

const Candidates = ({candidates, deleteUser, host}) => {
      
    if (candidates.length  > 0)   
          
      return (

        <div className="candidate">
            {candidates.map((el) => (
              <Candidate onDelete = {deleteUser} key={el.id} candidate={el} host={host}/>
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