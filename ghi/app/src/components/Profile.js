import React, { useEffect } from 'react';

export default function Profile(){

  let [accountData, setAccountData] = useState([]);
  let [dogData, setDogData] = useState([]);

  useEffect(() => {
    [fetch('http://localhost:8001/api/accounts'),
    fetch('http;//localhost:9001/api/dogs'),]
    .then(([res1, res2]) => {
      res1.json(), res2.json()})
    .then(([res1, res2]) => {
      setAccountData(res1), setDogData(res2)})
  }, [])

    return(
        <div className="shadow">
        <div className="h-[300px] flex justify-center">
          <div className="object-cover w-full h-full bg-[#FFB17A]"/>
          <div className=" flex absolute -bottom-8 gap-3">
            {/* <img
              src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
              className="object-cover border-4 border-gray-300 w-40 h-40 rounded-full shadow-xl mt-[-50rem]"
            />
            <img
              src="https://www.thesprucepets.com/thmb/YQzfza2oKOCzQIvX-K66BRi1DjI=/1080x1080/filters:no_upscale():max_bytes(150000):strip_icc()/30078352_448703938920062_6275637137232625664_n-5b0de8c443a1030036f9e15e.jpg"
              className="object-cover border-4 border-gray-300 w-40 h-40 rounded-full shadow-xl mt-[-50rem]"
            /> */}
          </div>
        </div>
        {accountData.map(item1  => (
        <div className='grid grid-cols-3'>
            <div className='grid grid-rows-5 px-4 gap-4 py-8'>
                <div className='font-bold uppercase' key={accountData.account_id}>{item1.username}</div>
                <div className='font-semibold text-gray-600' key={accountData.account_id}>{item1.gender}</div>
              {dogData.map(item2 => (
                <><div className='font-bold uppercase' key={dogData.dog_id}>{item2.dog_name}</div>
                <div className='font-semibold text-gray-600' key={dogData.dog_id}>{item2.dog_gender}</div></>
            ))}</div>
            <div className=' px-4 text-center'>
              <div className='py-8 font-semibold' key={accountData.account_id}>
                  {item1.about}
              </div>
            </div>
            <div className='text-right px-4 py-2'>
              <button className=' rounded-xl uppercase font-semibold border border-gray-800 w-[130px] bg-[#4F4789] hover:bg-[#6a60b8] text-gray-200'>edit profile</button>
            </div>
        </div>
      ))}
      </div>
)}