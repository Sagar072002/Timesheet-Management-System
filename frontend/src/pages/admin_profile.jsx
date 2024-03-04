import React,{useEffect,useState} from 'react';
import axios from "axios";
import { RxHamburgerMenu,RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { FaCamera, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({profilevalue,onUpdateProfile,func}) => {
    const [image, setImage] = useState(null);
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
    const [ham,setHam]=useState(true)
    const handleLogout = () => {
      toast.success("Log out successfully");
      sessionStorage.setItem("auth", "false");
      // sessionStorage.setItem("accessToken", "");
      //   sessionStorage.setItem("refreshToken", "");
      sessionStorage.setItem("userName", "");
      sessionStorage.setItem("password", "");
      setTimeout(() => {
        n("/");
      }, 4000); // Adjust the delay as needed
    };
  
    useEffect(() => {
      setEditedProfile({ ...profilevalue }); // Update edited profile when profilevalue changes
    }, [profilevalue]);
  
    const handleCrossClick = () => {
      func()
      setIsVisible(false);
    };
  
    const handleEditClick = () => {
      setIsEditable(true);
    };
  
    const handleSaveClick = () => {
      setIsEditable(false);
      onUpdateProfile(editedProfile); // Update profile value in parent component
      // setEditedProfile({ ...editedProfile }); // Reset edited profile
      handleInputChange({ target: { name: '', value: '' } });
      // toast.success("Updated successfully")
      updateDatabase();
    };
    
    const updateDatabase = async() => {
 
      try{
        // JSON.parse(sessionStorage.getItem("data")).image
        if(image==null)
        {
          setImage(JSON.parse(sessionStorage.getItem("data")).image)
        }
        var val=JSON.parse(sessionStorage.getItem('data'))
        val['image']=image
        console.log(val)
        sessionStorage.setItem('data',JSON.stringify(val))
        const named = sessionStorage.getItem("userName");
        const url = `http://localhost:3000/users/${named}`;
        console.log("userid:",named)
        const d = JSON.parse(sessionStorage.getItem("data"));
        console.log("edit", d);
        const response = await axios.put(url,
          {
             "name": d.name,
             "gender": d.gender,
             "email": d.email,
             "phone_number": d.phone_number,
             "age": d.age,
             "address": d.address,
             "image":image
          }     
        );
        
        //const data=response.data
        // console.log(data)
        // setProfileValue(data)
        if(response.status!==200){
          // response.status
          // console.log("*********",response.status,response.statusText,data.message,data.errors)
          //console.log(`${response.status}\n${response.statusText}\n${data.message}`)
        }
    
          // response.status
        //   toast.success(
        //     `${response.status}\n${response.statusText}\n${data.message}`
        //  )
        if(response.status===200){
    
         //toast.success("Registration successful!");
        
         toast.success('updated successfully');

        }
        
        }
        catch(error){
          toast.error(error.message)
        }
    } 
    const handleInputChange = (e) => {
      if (e && e.target) {
        const { name, value } = e.target;
        // setEditedProfile((prevProfile) => ({
        //   ...prevProfile,
        //   [name]: value,
        // }));
        console.log(name,value)
        var d = JSON.parse(sessionStorage.getItem("data"));
        sessionStorage.setItem("data",JSON.stringify({
          ...d,
          [name]: value,
        }))
        d = JSON.parse(sessionStorage.getItem("data"));

      }
    };
    const handleImageChange = (e) => {
      try{
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      var size = e.target.files[0].size;
      console.log(size/1000)
      if(size/1000>52){
        toast.error("Upload an image with file size less than 50kb");
        return false
      }
      reader.onload = () => {
        setImage(reader.result);
      };
     reader.onerror = error => {
        console.log("error ",error);
      }}catch{
  
      }
    };
    
    if (!isVisible) {
      return null; // If isVisible is false, return null to render nothing
    }
  return (


    <>
      <ToastContainer />
      <section className=" ">
    <div className="flex flex-col items-center justify-center px-6 py-1 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-md shadow min-h-[420px] min-w-[550px]  md:mt-0 sm:max-w-md xl:p-0 relative">
          <div className='absolute top-2 right-2 mt-2 mr-2 hover:bg-slate-400 hover:text-white rounded-full p-1'>
            <RxCross2 className='text-2xl'onClick={handleCrossClick}/>
          </div>
          <div className='flex justify-center'>
            {image!==null?
            <div className='relative'>
            <img src={image} className="w-32 h-32 object-scale-down shadow-lg rounded-full" onClick={() => { const inputElement = document.getElementById('image1');if (inputElement) {   inputElement.click();  }}}/>
            <input
                type="file"
                name="image1"
                id="image1"
                className="hidden" accept="image/*"
                disabled={!isEditable} // Disable if not editable
                onChange={(e) => handleImageChange(e)}
                onClick={(e) => handleImageChange(e)}

                required=""
              />
              </div>
            
            :
            <>
            <input
                type="file"
                name="image"
                id="image"
                className="hidden" accept="image/*"
                disabled={!isEditable} // Disable if not editable
                onChange={(e) => handleImageChange(e)}

                required=""
              />
          {JSON.parse(sessionStorage.getItem('data')).image!==null?<img src={JSON.parse(sessionStorage.getItem('data')).image} className="w-32 h-32 object-scale-down shadow-lg rounded-full" onClick={() => { const inputElement = document.getElementById('image');if (inputElement) {   inputElement.click();  }}} ></img>:<FaUser className="w-32 h-32 object-scale-down shadow-lg rounded-full border-black border-2"  onClick={(e) => handleImageChange(e)}/>}
          </>
        }
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
                    className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'     
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
                {isEditable && (
                  <button
                    type="button"
                    className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'                             onClick={handleSaveClick}
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
      
    </>
    
  
  )
}

export default Profile

// {
//     <div className={ham?`w-1/6 flex flex-col p-3 relative bg-cyan-600 bg-opacity-35 `:`hidden`}>
//       {ham?<RxCross2 className="absolute top-2 right-4 text-3xl" onClick={()=>{setHam(false)}}/>:<></>}
//         <div className=" justify-center relative  rounded-full flex">
//         {JSON.parse(sessionStorage.getItem('data')).image!==null?<img src={JSON.parse(sessionStorage.getItem('data')).image} className="w-32 h-32 object-scale-down mt-2 rounded-full"/>:<FaUser className="ml-5 mt-5 w-14 h-14" />}
          
//         </div>
//         <p className="text-center font-bold text-lg">Hii {JSON.parse(sessionStorage.getItem('data')).name}</p>
//         <div className="mt-14 text-xl  flex flex-col gap-8 justify-center items-center">
//           <Link to= '/newemp'>Current Timesheet</Link>
//           <Link to='/timesheetList'>Timesheet List</Link>
//           <Link to='/scorecard'>Score Card</Link>
//           <div className='w-full'>
//           <Link to='/profile'><p className='text-white text-center bg-cyan-600 px-8 py-3 w-full rounded-md font-bold'>Edit Profile</p></Link>
//           </div>
//           <button
//             className="px-6 py-3 rounded-sm border font-medium bg-white text-black mt-5  hover:cursor-pointer"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//         {/* <div className="-ml-10 mt-24 font-bold text-xl ">
//           <p className="text-center">©2023-2024</p>
//           <p className="text-center">All rights reserved</p>
//         </div> */}
//       </div>
//       <div className={ham?"w-5/6  ":'w-full'}>
//         {ham?<></>:<RxHamburgerMenu className="ml-4 mt-4 text-3xl" onClick={()=>{setHam(true)}}/>}
//         <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
//         <div className="w-full flex flex-col items-center rounded-md  min-h-[420px] min-w-[550px]  md:mt-0 sm:max-w-md xl:p-0 relative">
//           <div>
//             {image!==null?
//             <div className='relative'>
//             <img src={image} className="w-32 h-32 object-scale-down shadow-lg rounded-full" onClick={() => { const inputElement = document.getElementById('image1');if (inputElement) {   inputElement.click();  }}}/>
//             <input
//                 type="file"
//                 name="image1"
//                 id="image1"
//                 className="hidden" accept="image/*"
//                 disabled={!isEditable} // Disable if not editable
//                 onChange={(e) => handleImageChange(e)}
//                 onClick={(e) => handleImageChange(e)}

//                 required=""
//               />
//               </div>
            
//             :
//             <>
//             <input
//                 type="file"
//                 name="image"
//                 id="image"
//                 className="hidden" accept="image/*"
//                 disabled={!isEditable} // Disable if not editable
//                 onChange={(e) => handleImageChange(e)}

//                 required=""
//               />
//           {JSON.parse(sessionStorage.getItem('data')).image!==null?<img src={JSON.parse(sessionStorage.getItem('data')).image} className="w-32 h-32 object-scale-down shadow-lg rounded-full" onClick={() => { const inputElement = document.getElementById('image');if (inputElement) {   inputElement.click();  }}} ></img>:<FaUser className="w-32 h-32 object-scale-down shadow-lg rounded-full border-black border-2"  onClick={(e) => handleImageChange(e)}/>}
//           </>
//         }
//           </div>
//         <div className="w-full px-2 space-y-4 md:space-y-4 sm:p-8">
//           <form className="space-y-4 pt-4 md:space-y-2" action="#">
          
//             <div className="flex w-full gap-5">
//            <div className="flex flex-col gap-5 w-full">
//            <div className=''>
//               <label
//                 htmlFor="name"
//                 className="block mb-2 text-sm font-medium text-gray-900 "
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
//                 value={isEditable ? JSON.parse(sessionStorage.getItem("data")).name|| '' : JSON.parse(sessionStorage.getItem("data")).name || ''}
//                 // value={isEditable ? editedProfile.name || '' : profilevalue.name || ''}
//                 disabled={!isEditable} // Disable if not editable
//                 onChange={(e) => handleInputChange(e)}

//                 required=""
//               />
//             </div>
           
//             <div>
//               <label
//                 htmlFor="gender"
//                 className="block mb-2 text-sm font-medium text-gray-900 "
//               >
//                 Gender
//               </label>
//               <input
//                 type="text"
//                 name="gender"
//                 id="gender"
//                 value={isEditable ? JSON.parse(sessionStorage.getItem("data")).gender || '' : JSON.parse(sessionStorage.getItem("data")).gender || ''}
//                 // value={isEditable ? editedProfile.gender || '' : profilevalue.gender || ''}
//                                       disabled={!isEditable} // Disable if not editable
//                                       onChange={(e) => handleInputChange(e)}

//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
//                 required=""
//               />
              
//             </div>
            
//              <div>
//               <label
//                 htmlFor="address"
//                 className="block mb-2  text-sm font-medium text-gray-900 "
//               >
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 id="address"
//                 value={isEditable ? JSON.parse(sessionStorage.getItem("data")).address || '' : JSON.parse(sessionStorage.getItem("data")).address || ''}
//                 // value={isEditable ? editedProfile.address || '' : profilevalue.address || ''}
//                                       disabled={!isEditable} // Disable if not editable
//                                       onChange={(e) => handleInputChange(e)}

//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
//                 required=""
//               />
//             </div>
            
//            </div>
           
           
//             <div className='flex flex-col gap-5 w-full'>
          
//              <div>
//                <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 "
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
//                 value={isEditable ? JSON.parse(sessionStorage.getItem("data")).email || '' : JSON.parse(sessionStorage.getItem("data")).email || ''}
//                 // value={isEditable ? editedProfile.email || '' : profilevalue.email || ''}
//                                       disabled={!isEditable} // Disable if not editable
//                                       onChange={(e) => handleInputChange(e)}

//                 required=""
//               />
//              </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block mb-2 text-sm font-medium text-gray-900 "
//               >
//                 Phone
//               </label>
//               <input
//                 type="number"
//                 name="phone"
//                 id="phone"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
//                 value={isEditable ? JSON.parse(sessionStorage.getItem("data")).phone_number || '' : JSON.parse(sessionStorage.getItem("data")).phone_number || ''}
//                 // value={isEditable ? editedProfile.phone_number || '' : profilevalue.phone_number || ''}
//                                       disabled={!isEditable} // Disable if not editable
//                                       onChange={(e) => handleInputChange(e)}

//                 required=""
//               />
//             </div>
//             <div>
//                <label
//                 htmlFor="age"
//                 className="block mb-2 text-sm font-medium text-gray-900 "
//               >
//                 Age
//               </label>
//               <input
//                 type="number"
//                 name="age"
//                 id="age"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
//                 value={isEditable ? JSON.parse(sessionStorage.getItem("data")).age || '' : JSON.parse(sessionStorage.getItem("data")).age || ''}
//                 // value={isEditable ? editedProfile.age || '' : profilevalue.age || ''}
//                                       disabled={!isEditable} // Disable if not editable
//                                       onChange={(e) => handleInputChange(e)}
//                 required=""
//               />
//              </div>
           
//             </div>
//             </div>
            
//             <div className="flex gap-8 pt-7">
//                 {!isEditable && (
//                   <button
//                     type="button"
//                     className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'     
//                     onClick={handleEditClick}
//                   >
//                     Edit
//                   </button>
//                 )}
//                 {isEditable && (
//                   <button
//                     type="button"
//                     className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'                             onClick={handleSaveClick}
//                   >
//                     Save
//                   </button>
//                 )}
//               </div>
            
//           </form>
//         </div>
//       </div>
//       </div>
        
      
//       </div>
// }


{/* <section className=" p-3">
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
                    className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'     
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
                {isEditable && (
                  <button
                    type="button"
                    className='w-full  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'                             onClick={handleSaveClick}
                  >
                    Save
                  </button>
                )}
              </div>
            
          </form>
        </div>
      </div>
    </div>
  </section>  */}



