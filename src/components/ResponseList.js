import React from "react";

function ResponseList(props) {

  let title;

  props.typeOfSearch?title="Перелік кандидатів":title="Перелік вакансій";
       return (
      <div className="App">
        <h2>
         {title} 
        </h2>
       </div>
    );
  }
  export default ResponseList