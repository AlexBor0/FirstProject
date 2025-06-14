import ProfileForm from "./ProfileForm";


const PageOne = ( { 
    currentUser,
    host,
    getDataItems,
    axios,
    setCurrentUser,

} ) => {



    return (
        <div className="pageOne">

            <div className="profileHead" >
                ПРОФІЛЬ
            </div>
            <ProfileForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                host={host} 
                getDataItems={getDataItems}
                axios={axios}
            />      
        </div>
    )
}
export default PageOne;