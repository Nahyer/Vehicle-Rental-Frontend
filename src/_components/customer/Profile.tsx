import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

import EditProfile from "./EditProfile"

const Profile = () => {
const {user} =useSelector((u:RootState)=>u.session)
if(!user) return <div>please login to view your profile</div>
const {full_name, email, contact_phone}=user
console.log(user)

return (
	<div className='bg-gray-100 p-4 rounded-lg shadow-md'>
		<h2 className='text-2xl font-bold mb-4'>Basic Information</h2>
		<p className='text-lg'>Name: {full_name}</p>
		<p className='text-lg'>Email: {email}</p>
		<p className='text-lg'>Contact Number: {contact_phone}</p>

		<button
			className='btn'
			onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()}
		>
			open modal
		</button>
		<dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box'>
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <EditProfile />
				<div className='modal-action'>
					<form method='dialog'>
						{/* if there is a button in form, it will close the modal */}
						<button className='btn'>Close</button>
					</form>
				</div>
			</div>
		</dialog>
  </div>
);

}

export default Profile


