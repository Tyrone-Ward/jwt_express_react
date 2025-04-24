import { useState, useEffect } from "react"
import authDataApi from '../api/index.js'

const UsersPage = () => {
  const [tableData, setTableData] = useState()

  
  useEffect(() => {
    const controller = new AbortController()
    const getUsersData = async () => {
      try {
        const response = await authDataApi.get('/listAllUsers', { signal: controller.signal })
        console.log(response.data)
        setTableData(response.data)      
      } catch (error) {
        console.log(error)  
      }
    }
    
    getUsersData()
    // DONE: add AbortController
    return () => {
      controller.abort()
    }
  }, [])
// TODO: Change to a stacked list https://tailwindcss.com/plus/ui-blocks/application-ui/lists/stacked-lists
  return ( tableData && 
    <div>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b-2 border-gray-400 p-2">User Id</th>
            <th className="border-b-2 border-gray-400 p-2">Username</th>
            <th className="border-b-2 border-gray-400 p-2">Email address</th>
            <th className="border-b-2 border-gray-400 p-2">Role</th>
            <th className="border-b-2 border-gray-400 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="border-t-1 border-gray-400 p-2 text-center">{row.id}</td>
              <td className="border-t-1 border-gray-400 p-2">{row.username}</td>
              <td className="border-t-1 border-gray-400 p-2">{row.email}</td>
              <td className="border-t-1 border-gray-400 p-2 text-center">{row.role}</td>
              <td className="border-t-1 border-gray-400 p-2 text-center"><a href='#'>Edit</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage