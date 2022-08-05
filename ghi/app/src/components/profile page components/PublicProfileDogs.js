import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import { Link } from 'react-router-dom';




const PublicProfileDogs = (props) => {
  let [isLoaded, setIsLoaded] = useState(false);

  // if (props.userDogData.length != 0 && isLoaded == false) {

  return (
    <div className='py-20' id="about">
      <div className='w-full mx-auto py-10 mt-1'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold uppercase'>D<span className='text-green-600'>O</span><span className='text-orange-600'>G</span><span className='text-purple-600'>S</span></h2>
        </div>
      </div>
      <div className='flex py-4'>
        <Swiper
          freeMode={true}
          grabCursor={false}
          modules={[FreeMode]}
          className='mySwiper w-screen'
          slidesPerView={3}
          spaceBetween={100}
        >
          {props.userDogData.map(dog =>
            <SwiperSlide>
              <div className='border py-6 rounded-xl shadow-xl text-center p-6 w-[400px]'>
                <div className='flex items-center justify-center'>
                  <img className='w-[250px] h-[250px] rounded-lg' src={dog.dog_photo} />
                </div>
                <h1 className='text-blue-600 text-2xl font-semibold mt-4'>{dog.dog_name} <span className='px-4 text-red-400'> ( {dog.dog_gender} )</span></h1>
                <h2 className='py-2 font-semibold px-4'>{dog.dog_about}</h2>
                <div className='text-left px-3 py-4'>
                  <h1 className='font-bold text-2xl text-gray-900 px-2 mt-2'> General Information </h1>
                  <p className='font-semibold text-gray-600'><span className='font-bold text-black uppercase px-2'>Breed:</span>{dog.dog_breed}</p>
                  <p className='font-semibold text-gray-600'><span className='font-bold text-black uppercase px-2'>Size:</span>{dog.dog_size}</p>
                  <p className='font-semibold text-gray-600'><span className='font-bold text-black uppercase px-2'>Weight:</span> {dog.dog_weight}</p>
                  <p className='font-semibold text-gray-600'><span className='font-bold text-black uppercase px-2'>Temperament:</span> {dog.dog_temperament}</p>
                  <h1 className='font-bold text-2xl text-gray-900 px-2 mt-4'> Medical </h1>
                  <div>
                    <p className='font-semibold text-gray-600'><span className='font-bold text-black uppercase px-2'>Vaccinations:</span>{dog.vaccination_history}</p>
                    <p className='font-semibold text-gray-600'><span className='font-bold text-black uppercase px-2'>Spayed/Neutered:</span>{dog.spayed_neutered ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

    </div>
  )
}

export default PublicProfileDogs