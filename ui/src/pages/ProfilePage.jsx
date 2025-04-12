import React from 'react'
import { useUsername, useUserRole, useUserId  } from '../stores/auth/auth.store'

const ProfilePage = () => {
  const username = useUsername()
  const role = useUserRole()
  const uid = useUserId()

  return (
    <div className='px-20 py-20'>
      <div className="px- sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details of the user.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Username</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{username}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">User ID</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{uid}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Role</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{role.toUpperCase()}</dd>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Bio</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dolorem praesentium sit nam. Voluptas ab maxime nulla itaque commodi repellat quidem rerum ipsam distinctio nostrum ipsum, similique expedita fugit soluta!
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  )
}

export default ProfilePage
