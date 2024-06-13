import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const [namaVariable, namaFuncUntukUbahIsiVar] = useState(tipedata)
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const [errorData, setErrorData] = useState([]);
  const navigate = useNavigate(); 

  function handleLogin() {
    console.log(inputData);
    // axios.methodApi('linkapi')
    // console.log(inputData); //console.log buat mengecek si data
    axios.post('http://localhost:8000/login', inputData)
      .then(res => {
        // res : response
        // then : ketika berhasil mau ngapain
        // console.log(res)
        // localStorage : menyimpan data di browser, sementara
        localStorage.setItem('access_token', res.data.data.access_token);
        // memindahkan halaman
        navigate('/profile')

      })
      .catch(err => {
        // catch : ketika err mau ngapain
        console.log(err)
        // masukin data error validasi ke state errorData
        setErrorData(err.response.data);
        console.log(data.data)
      })
  }

  return <>
    <Navbar />

    <form class="max-w-sm mx-auto mt-20">
      {
        Object.keys(errorData).length > 0 ? (
          <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Danger</span>
            <div>
              <span class="font-medium">Gagal Login:</span>
              <ul class="mt-1.5 list-disc list-inside">
                {
                  // loooping di react mau object/array pake map
                  // index : mengambil index object/array
                  // value : ngambil isi per sayi satu nya
                  // manggil variable pake {} untuk memanggil variable yaitu variable errorData
                  // manggil () yaitu untuk memanggil html 
                  Object.entries(errorData).map(([index, value]) => (
                    <li key={index}>{value}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        ) : ''
      }
      <br></br>
      <div class="mb-5 border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your email</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="masukan email anda" onChange={e => setInputData({ ...inputData, email: e.target.value })} required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setInputData({ ...inputData, password: e.target.value })} required />
      </div>
      <div class="flex items-start mb-5">
      </div>
      <button onClick={handleLogin} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
    </form>

  </>
}