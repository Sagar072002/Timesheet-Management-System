import React,{useEffect,useState} from 'react';
import {useNavigate } from 'react-router-dom';
import logo from "../assets/user_img.jpg";
import {RxCross2} from "react-icons/rx"

const Profile = ({profilevalue,onUpdateProfile}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isEditable, setIsEditable] = useState(false); // State to track if fields are editable
    const [editedProfile, setEditedProfile] = useState({ ...profilevalue });

    const n=useNavigate();
    useEffect(
      ()=>{
        const d = JSON.parse(sessionStorage.getItem("data"));
        console.log("session", d);
        // const d=sessionStorage.getItem("data")
        // console.log(d)
        if(sessionStorage.getItem('auth')==="false"){
          n('/')
        }
      },[]
    )
  
    useEffect(() => {
      setEditedProfile({ ...profilevalue }); // Update edited profile when profilevalue changes
    }, [profilevalue]);
  
    const handleCrossClick = () => {
      setIsVisible(false);
    };
  
    const handleEditClick = () => {
      setIsEditable(true);
    };
  
    const handleSaveClick = () => {
      setIsEditable(false);
      onUpdateProfile(editedProfile); // Update profile value in parent component
      setEditedProfile({ ...editedProfile }); // Reset edited profile
      handleInputChange({ target: { name: '', value: '' } });
    };
    const handleInputChange = (e) => {
      if (e && e.target) {
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
        var d = JSON.parse(sessionStorage.getItem("data"));
        sessionStorage.setItem("data",JSON.stringify({
          ...d,
          [name]: value,
        }))
        d = JSON.parse(sessionStorage.getItem("data"));

      }
    };
    
    if (!isVisible) {
      return null; // If isVisible is false, return null to render nothing
    }
  return (
    <section className=" p-3">
    <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-md shadow min-h-[420px] min-w-[550px]  md:mt-0 sm:max-w-md xl:p-0 relative">
          <div className='absolute top-2 right-2 mt-2 mr-2 hover:bg-slate-400 hover:text-white rounded-full p-1'>
            <RxCross2 className='text-2xl'onClick={handleCrossClick}/>
          </div>
        <div className="px-2 space-y-4 md:space-y-4 sm:p-8">
          <form className="space-y-4 pt-4 md:space-y-2" action="#">
          
            <div className="flex w-full gap-5">
           <div className="flex flex-col gap-5 w-full">
           <div className=''>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                value={isEditable ? JSON.parse(sessionStorage.getItem("data")).name|| '' : JSON.parse(sessionStorage.getItem("data")).name || ''}
                // value={isEditable ? editedProfile.name || '' : profilevalue.name || ''}
                disabled={!isEditable} // Disable if not editable
                onChange={(e) => handleInputChange(e)}

                required=""
              />
            </div>
           
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Gender
              </label>
              <input
                type="text"
                name="gender"
                id="gender"
                value={isEditable ? JSON.parse(sessionStorage.getItem("data")).gender || '' : JSON.parse(sessionStorage.getItem("data")).gender || ''}
                // value={isEditable ? editedProfile.gender || '' : profilevalue.gender || ''}
                                      disabled={!isEditable} // Disable if not editable
                                      onChange={(e) => handleInputChange(e)}

                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                required=""
              />
              
            </div>
            
             <div>
              <label
                htmlFor="address"
                className="block mb-2  text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={isEditable ? JSON.parse(sessionStorage.getItem("data")).address || '' : JSON.parse(sessionStorage.getItem("data")).address || ''}
                // value={isEditable ? editedProfile.address || '' : profilevalue.address || ''}
                                      disabled={!isEditable} // Disable if not editable
                                      onChange={(e) => handleInputChange(e)}

                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                required=""
              />
            </div>
            
           </div>
           
           
            <div className='flex flex-col gap-5 w-full'>
          
             <div>
               <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                value={isEditable ? JSON.parse(sessionStorage.getItem("data")).email || '' : JSON.parse(sessionStorage.getItem("data")).email || ''}
                // value={isEditable ? editedProfile.email || '' : profilevalue.email || ''}
                                      disabled={!isEditable} // Disable if not editable
                                      onChange={(e) => handleInputChange(e)}

                required=""
              />
             </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                value={isEditable ? JSON.parse(sessionStorage.getItem("data")).phone_number || '' : JSON.parse(sessionStorage.getItem("data")).phone_number || ''}
                // value={isEditable ? editedProfile.phone_number || '' : profilevalue.phone_number || ''}
                                      disabled={!isEditable} // Disable if not editable
                                      onChange={(e) => handleInputChange(e)}

                required=""
              />
            </div>
            <div>
               <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                value={isEditable ? JSON.parse(sessionStorage.getItem("data")).age || '' : JSON.parse(sessionStorage.getItem("data")).age || ''}
                // value={isEditable ? editedProfile.age || '' : profilevalue.age || ''}
                                      disabled={!isEditable} // Disable if not editable
                                      onChange={(e) => handleInputChange(e)}
                required=""
              />
             </div>
           
            </div>
            </div>
            
            <div className="flex gap-8 pt-7">
                {!isEditable && (
                  <button
                    type="button"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-3 text-center"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
                {isEditable && (
                  <button
                    type="button"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-3 text-center"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                )}
              </div>
            
          </form>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Profile




