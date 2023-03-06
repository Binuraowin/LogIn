import React from 'react';
import { useState } from 'react';
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [confirmPassowrd, setconfirmPassowrd] = useState('')

  let navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }


    const response = await fetch('/users/', {
      method: 'POST',
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
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setconfirmPassowrd('')
      console.log('new user added:', json)
    }

  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-zinc-500">
          Sign Up
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
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-zinc-500 focus:ring-zinc-500 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-zinc-500 focus:ring-zinc-500 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-zinc-500 focus:ring-zinc-500 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-zinc-500 focus:ring-zinc-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-bold text-zinc-800"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setconfirmPassowrd(e.target.value)}
              value={confirmPassowrd}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-zinc-500 bg-white border rounded-md focus:border-zinc-500 focus:ring-zinc-500 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              // onClick={() => {
              //   handleSubmit();
              // }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-zinc-500 rounded-md hover:bg-zinc-600 focus:outline-none focus:bg-zinc-600">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}