import {useState} from "react";
import Spinner from "./Spinner";
import './../css/CompanyForm.css';
import MessagePost from "./MessagePost";
import CompanyForm from "./CompanyForm";
import PrimaryMessage from "./PrimaryMessage";
import CompanyProfMain from "./CompanyProfMain";

const CompanyPage = ({
    currentUser,
    getDataItems,
    setCurrentUser,
    axios,
    host
}) => {

    const [newCompany, setNewCompany] = useState({
        companyName: '',
        logo: '',
        telephone: '',
        telephone2: '',
        telephone3: '',
        companyEmail: '',
        companySite: '',
        telegram: '',
    });

    const [isPrev, setIsPrev] = useState(true),
          [openForm, setOpenForm] = useState(false),
          [loading, setLoading] = useState(false),
          [postFetch, setPostFetch] = useState(false),
          [addTelephone, setAddTelephone] = useState(false),
          [postSuccess, setPostSuccess] = useState(null);
          

    const resetNewCompany = () => ({
        companyName: '',
        logo: '',
        telephone: '',
        telephone2: '',
        telephone3: '',
        companyEmail: '',
        companySite: '',
        telegram: ''  
    });
   

    return (
        <>
            {currentUser?.company?.companyName && !loading && !openForm &&
                <CompanyProfMain
                    currentUser={currentUser}
                    newCompany={newCompany}
                    host={host}
                    setOpenForm={setOpenForm}
                    setIsPrev={setIsPrev}
                />
            }
            { (openForm && !isPrev && !postFetch) &&
                <CompanyForm
                    axios={axios}
                    host={host}
                    getDataItems={getDataItems}
                    newCompany={newCompany}
                    setNewCompany={setNewCompany}
                    setLoading={setLoading}
                    setPostSuccess={setPostSuccess}
                    setPostFetch={setPostFetch}
                    setOpenForm={setOpenForm}
                    setIsPrev={setIsPrev}
                    resetNewCompany={resetNewCompany}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    addTelephone={addTelephone}
                    setAddTelephone={setAddTelephone}
                />
            }

            { isPrev && !postFetch && !currentUser?.company?.companyName &&
                <PrimaryMessage
                    setIsPrev={setIsPrev}
                    setOpenForm={setOpenForm}
                />
            }

            {loading && 
                <div className="loading">
                    <Spinner className="profileImg"/>
                </div>
            }

            {postSuccess && 
                <MessagePost 
                    isOpen={postSuccess} 
                    onClose={setPostSuccess} 
                    closeItem={setOpenForm}
                    typeOfDoc={"Компанія"}
                    newClass={"modalAdCont addCompany"}
                    editable={true}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setLoading={setLoading}
                    axios={axios}
                    host={host}
                    setPostFetch={setPostFetch}
                />
            }
     
        </>

    )
}

export default CompanyPage;