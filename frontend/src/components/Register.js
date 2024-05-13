import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.jpg";
import axios from "axios"
// import {useNavigate} from 'react-router-dom'

function Register() {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState([]);
  const [matches, setMatches] = useState([]);
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(password);
    // console.log(firstName);
    // console.log(lastName);
    // console.log(birthday);
    // console.log(email);
    // console.log(role);
    // console.log(description);
    // console.log(image);
    // console.log(file);
    // console.log("submitted");

    const formData = new FormData();
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('birthday', birthday);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('description', description);
    formData.append('likes', likes);
    formData.append('matches', matches);
    formData.append('image', image);
    formData.append('file', file);


    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", formData);
      
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Registration failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);

      const fileName = file.name
      setImage(fileName)
    }
  };


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-50 w-50" src={logo} width={100} height={100} alt="takeMeLogo" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit} action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="last-name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="birthday"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of birth
              </label>
              <div className="mt-2">
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  autoComplete="birthday"
                  required
                  onChange={(e) => setBirthday(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                />
                <p className="text-sm leading-6 text-gray-400">Please select your date of birth.</p>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <legend className="text-sm font-semibold leading-6 text-gray-900">Role</legend>
              <div className="space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id="adopter"
                    name="role"
                    type="radio"
                    value="adopter"
                    checked={role === "adopter"}
                    onChange={(e) => setRole("adopter")}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="adopter"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adopter
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="adoptee"
                    name="role"
                    type="radio"
                    checked={role === "adoptee"}
                    onChange={(e) => setRole("adoptee")}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="adoptee"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adoptee
                  </label>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="space-y-2 spac">
              <label htmlFor="image-upload" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Image
              </label>
              <input
                type="file"
                id="image-upload"
                name="image-upload"
                onChange={handleImageChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
              {file && (
                <img
                  className="aspect-square"
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  style={{
                    borderRadius: '0.5rem'  // Optional: Adds rounded corners to the image
                  }}
                />
              )}
            </div>

            <button
              type="button" // Changed to type button to prevent form auto-submit
              onClick={onSubmit}
              className="mt-4 w-full max-w-md bg-indigo-600 text-white rounded-md px-4 py-2"
            >
              Register
            </button>
          </form>
        </div >
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have your account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div >
    </>
  );
}


export default Register;