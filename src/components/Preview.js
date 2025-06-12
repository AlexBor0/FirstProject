import {useEffect, useRef, useState} from "react";
import './../css/Preview.css';
import PreviewDoc from "./PreviewDoc";

const Preview = ( {
  newVacancy,
  setNewVacancy,
  setSaveTextEditor,
  setPostFetch,
  setPostSuccess,
  setLoading,
  setError,
  host,
  newCandidate,
  setNewCandidate,
  currentUser,
  setCurrentUser,
  axios,
  setIsPreviewVisible,
  editable,
  type
} ) => {

    const previewContentRef = useRef(null);
    const [failUpload, setFailUpload] = useState(null);
    
    

    useEffect(() => {
        if (previewContentRef.current) {
            previewContentRef.current.scrollTop = 100;
        }
    }, []);

    const apiRequest = async (apiCall) => {
        setLoading(true);
        setPostFetch(true);
        try {
          const response = await apiCall();
          setPostSuccess(true);
          return response;
        } catch (error) {
          setError(error);
          console.error('Ошибка:', error.response?.data || error.message);
        } finally {
          setLoading(false);
          setSaveTextEditor(false);
        }
      };

      const fetchNewVacancy = async () => {

        const idCandidateResponse = await axios.get(
          `${host}/api/candidates?filters[title][$eq]=${newVacancy.vacancy}`
        );
        const candidateId = idCandidateResponse.data.data[0]?.documentId;
    
        if (!candidateId) console.log('Кандидат не знайдений');
        const data = {
          company: { connect: [currentUser.company.id] },
          title: newVacancy.vacancy,
          candidates: { connect: [candidateId] } || newVacancy.candidate,
          user: {connect: [currentUser.id] },
          department: newVacancy.department,
          employment: newVacancy.employment,
          workSchedule: newVacancy.workSchedule,
          workFormat: newVacancy.workFormat,
          location: newVacancy.city,
          region: newVacancy.region,
          salary: newVacancy.salary,
          experience: newVacancy.experience,
          description: newVacancy.description,
          requirements: newVacancy.requirements,
        };
    
        const response = await apiRequest(() =>
          axios.post(`${host}/api/vacancies`, { data }, {
            headers: {
              'Authorization': `Bearer ${currentUser.userJWT}`, 
              'Content-Type': 'application/json', 
            },
          })
        );
        if (response) {
          setNewVacancy((prev) => ({ ...prev, documentId: response.data.data.documentId }));
        }
      };

      const fetchNewCandidate = async () => {
        const file = new FormData();
        file.append("files", newCandidate.foto);
    
        const imageResponse = await apiRequest(() =>
          axios.post(`${host}/api/upload`, file, {
            headers: {
              'Authorization': `Bearer ${currentUser.userJWT}`, 
              'Content-Type': 'multipart/form-data', 
            },
          })
        );
        const newFotoId = imageResponse?.data[0].id;
    
        const idVacancyResponse = await axios.get(
          `${host}/api/vacancies?filters[title][$eq]=${newCandidate.vacancy}`
        );
        const vacancyId = idVacancyResponse.data.data[0]?.documentId;
    
        if (!vacancyId) console.log('Вакансия не найдена');
    
        const data = {
          firstName: newCandidate.firstName,
          lastName: newCandidate.lastName,
          email: newCandidate.email,
          telephone: newCandidate.telephone.replace(/\D/g, ''),
          vacancies: { connect: [vacancyId] } || newCandidate.vacancy,
          user: {connect: [currentUser.id] },
          title: newCandidate.vacancy,
          city: newCandidate.city,
          region: newCandidate.region,
          resume: newCandidate.resume,
          foto: newFotoId || 17,
        };
    
        const response = await apiRequest(() =>
          axios.post(`${host}/api/candidates`, { data }, {
            headers: { 
              'Authorization': `Bearer ${currentUser.userJWT}`,
              'Content-Type': 'application/json' },
          })
        );
        if (response) {
          setNewCandidate((prev) => ({ ...prev, documentId: response.data.data.documentId }));
          setCurrentUser((prev) => ({ ...prev, addDoc: response.data.data.documentId }));
        }
        if 
        // (response.status === 400 && 404) 
        (response.status!== 200)
          {
          setFailUpload(true);
        };
      };
      
      useEffect ((newFotoId) => {
        if (failUpload) {
          const fetchDeleteImage = async () => {
            const deletePrevImage = await axios.delete(
              `${host}/api/upload/files/${newFotoId}`,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.userJWT}`,
                },
              }  
            );
            if (deletePrevImage.status !== 200) {
              throw new Error("Помилка при видаленні відправленого файлу");
            };
          };
          fetchDeleteImage();
        }     
      }, [currentUser.userJWT, host, axios, failUpload]);



      const requirements = type && Array.isArray(newVacancy.requirements)
      ? newVacancy.requirements
          .map((block) => {
            if (!block || !block.type) return null;
            if (!Array.isArray(block.children)) {
              return { ...block, children: [{ type: 'text', text: '' }] };
            }
            return block;
          })
          .filter(Boolean)
      : [];

      const edit = () => {
        setSaveTextEditor(false);
        if (type) {
          setNewVacancy((prev) => ({ ...prev, requirements: [] }));
        };
        setIsPreviewVisible(false);
      };

      const post = () => {
        type ? fetchNewVacancy() : fetchNewCandidate();

      };

      const onClose = () => {
        setIsPreviewVisible(false);
    };

        return (

              <PreviewDoc
                  documentData={type ? newVacancy : newCandidate}
                  post={post}
                  edit={edit}
                  editable={editable}
                  requirements={requirements}
                  previewContentRef={previewContentRef}
                  currentUser={currentUser}
                  host={host}
                  onClose={onClose}
                  type={type ? "vacancy" : "resume"}
              
              />

          );
};

export default Preview