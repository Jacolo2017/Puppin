import React from 'react'

const Events = () => {
  return (
    <div className='grid grid-cols-3 items-center gap-5 px-10  w-full h-screen'>
      
      {/* left  */}
      <div className='bg-gray-200 w-[400px] rounded-lg px-4 py-4 shadow-xl items-center'>
        <div>
        <img className='w-[400px] rounded-md' src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F20%2Fdogs-playing-at-dog-park-1210828938-2000.jpg'/>
        </div>
        <h1 className='font-semibold text-3xl text-center py-3'>header</h1>
        <p className='font-gray-600 text-center text-lg py-4'>this is the body omg</p>
        <h2 className='font-gray-600 text-center text-lg py-3'>footer</h2>
      </div>
      {/* middle */}
      <div className='bg-gray-200 w-[400px] rounded-lg px-4 py-4 shadow-xl items-center'>
        <div>
        <img className='w-[400px] rounded-md' src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F20%2Fdogs-playing-at-dog-park-1210828938-2000.jpg'/>
        </div>
        <h1 className='font-semibold text-3xl text-center py-3 items-center'>header</h1>
        <p className='font-gray-600 text-center text-lg py-4'>this is the body omg</p>
        <h2 className='font-gray-600 text-center text-lg py-3'>footer</h2>
      </div>
      {/* right */}
      <div className='bg-gray-200 w-[400px] rounded-lg px-4 py-4 shadow-xl'>
        <div>
        <img className='w-[400px] rounded-md' src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F20%2Fdogs-playing-at-dog-park-1210828938-2000.jpg'/>
        </div>
        <h1 className='font-semibold text-3xl text-center py-3'>header</h1>
        <p className='font-gray-600 text-center text-lg py-4'>this is the body omg</p>
        <h2 className='font-gray-600 text-center text-lg py-3'>footer</h2>
      </div>


    </div>
  )
}

export default Events