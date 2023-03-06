import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function UsersList() {
    const [userList, setUserList] = useState('')
    const [selectedUserId, setSelectedUserId] = useState('')

    let navigate = useNavigate();

    const fetchUsers = async () => {
        console.log('Fetching users')
        const response = await fetch(`/users`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        const json = await response.json()
        console.log('JSON', json.data)

        if (response.ok) {
            setUserList(json.data)
            console.log('user List', json.data)
        }
    }
    const onUserClick = async (id) => {
        setSelectedUserId(id)
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="relative flex flex-col justify-center">
            <div className="w-full p-6 m-auto">
                <div className='flex flex-col justify-between'>
                    <div class="relative">
                        <h1 className="text-3xl font-semibold text-zinc-500">
                            Users List
                        </h1>
                    </div>
                </div>
                <div>

                </div>


            </div>
            <table class="shadow-lg bg-white border-collapse">
                <tr>
                    <th class="bg-gray-100 border text-left px-8 py-4">Firt Name</th>
                    <th class="bg-gray-100 border text-left px-8 py-4">Last Name</th>
                    <th class="bg-gray-100 border text-left px-8 py-4">Email</th>
                </tr>
                {userList && userList.map(user => (
                    // <option value={g.name} >{g.name}</option>
                    <tr onClick={() => onUserClick(user._id)}>
                        <td class="border px-8 py-4" >{user.first_name}</td>
                        <td class="border px-8 py-4">{user.last_name}</td>
                        <td class="border px-8 py-4">{user.email}</td>
                    </tr>
                ))}

            </table>
        </div>
    );
}