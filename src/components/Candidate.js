import ResumeCard from "./ResumeCard";


const Candidate = ( {
    currentUser,
    candidate, 
    onDelete, 
    host, 
    type 
} ) => {
    const editable = false;


    const onClose = () => {
        onDelete(candidate.id);
    };

       return (
        <>
            <ResumeCard
                candidate={candidate}
                onClose={onClose}
                editable={editable}
                parentComponent={'Candidate'}
                currentUser={currentUser}
                type={type}
                host={host}
            />
        </>
       
    )
  }
  export default Candidate