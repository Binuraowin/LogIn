import React from 'react';
import { useState,useEffect } from 'react';
import { redirect } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  let navigate = useNavigate(); 
  let { id } = useParams();

  useEffect(() => {
    fetchUser()
  }, [id])
  

  const fetchUser = async () => {
    const headers = {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }
    }
    const response = await fetch(`/users/${id}`, headers)
    const json = await response.json()
    console.log(json)
    if (response.ok) {
        setEmail(json.data.email)
        setFirstName(json.data.first_name)
        setLastName(json.data.last_name)
        setPassword(json.data.password)
    }
}


  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }


    const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      console.log('user updated:', json)
      navigate("/success")
    }

  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-zinc-500">
          Details
        </h1>
        <form className="mt-6" onSubmit={handleSubmit} >
          <div className="mb-2">
            <label
              className="block text-sm font-bold text-zinc-800"
            >
              Firt Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-bold text-zinc-800"
            >
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-bold text-zinc-800"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-bold text-zinc-800"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              // onClick={() => {
              //   handleSubmit();
              // }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}