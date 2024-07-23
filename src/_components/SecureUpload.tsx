// import { useState } from 'react'
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { ThreeDots } from 'react-loader-spinner'

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// const SecureUpload = () => {

//   const [img, setImg] = useState<string|null>(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   // type, timestamp, signature
 


//   //RTK
//   const getSignatureForUpload = async (folder:string) => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/upload`, { folder });
//       return res.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');

//       const imgUrl = await uploadFile(imgTimestamp, imgSignature);

    
//       // const videoUrl = await uploadFile('video', videoTimestamp, videoSignature);

//       // Send backend api request
//       await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/images`, { imgUrl });

//       // Reset states 
//       setImg(null);
  

//       console.log("File upload success!");
//       setLoading(false);
//       navigate("/")
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="video">Video:</label>
//           <br />
//           <input
//             type="file"
//             accept="video/*"
//             id="video"
//             onChange={(e) => setVideo((prev) => e.target.files[0])}
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="img">Image:</label>
//           <br />
//           <input
//             type="file"
//             accept="image/*"
//             id="img"
//             onChange={(e) => setImg((prev) => e.target.files[0])}
//           />
//         </div>
//         <br />
//         <button type="submit">Upload</button>
//       </form>

//       {
//         loading && <ThreeDots
//           height="80"
//           width="80"
//           radius="9"
//           color="#4fa94d"
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{}}
//           wrapperClassName=""
//           visible={true}
//         />
//       }
//     </div>
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <Label htmlFor="picture">Picture</Label>
//       <Input id="picture" type="file" />
//     </div>
    
//     </>


//   )
// }

// export default SecureUpload


