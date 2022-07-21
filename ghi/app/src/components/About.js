import React from 'react'

const About = () => {
  return (
    <div className='w-full my-32 py-36 mt-1' id="about">
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Looking for an event with trusted dog owners?</h2>
                <p className='text-3xl py-6 text-gray-700'>
                    Then, Purely Puptonic is for you! We want to create an enviorment
                    where you don't have to worry about dogs or their owners misbehaving.
                </p>
            </div>

            <div className='grid md:grid-cols-3 gap-10 px-2 py-20 text-center'>
                
                <div className='border py-6 rounded-xl shadow-xl text-center p-6'>
                    <div className='items-center mt-[-4rem] '>
                        <img className='w-[90px] rounded-full border-2 border-blue-500' src='https://static.vecteezy.com/system/resources/previews/004/111/270/non_2x/faces-profile-avatars-people-expression-simple-heads-male-female-persons-cartoon-illustrations-profile-male-female-people-face-user-happy-free-vector.jpg'/>
                    </div>
                    <div>
                        <img className='' src='https://media.istockphoto.com/vectors/girl-walking-with-dog-outdoors-female-character-run-with-funny-pet-vector-id1316118672?b=1&k=20&m=1316118672&s=612x612&w=0&h=Q3vAUwJXt9aVCjkkc2HJpUsZS0QGj-gsihNQDySRaqw='/>
                    </div>
                    <h1 className='text-blue-500 text-2xl font-semibold'>Christine M.</h1>
                    <h2 className='py-2 font-semibold'>When I met Emily, and her dog Max in my local park I knew we'd click!</h2>
                    <p className='py-3 uppercase font-bold text-green-700'>Cloverfield Park</p>
                </div>
            
                <div className='border py-8 rounded-xl shadow-xl text-center p-6'>
                    <div className='items-center mt-[-4rem] '>
                        <img className='w-[90px] rounded-full border-2 border-red-500' src='https://static.vecteezy.com/system/resources/previews/004/105/910/original/faces-profile-avatars-people-expression-simple-heads-male-female-persons-cartoon-illustrations-profile-male-female-people-face-user-happy-free-vector.jpg'/>
                    </div>
                    <div>
                        <img className='w-[305px]' src='https://static.vecteezy.com/system/resources/previews/001/839/936/non_2x/young-man-walking-with-dog-practicing-activity-free-vector.jpg'/>
                    </div>
                    <h1 className='text-red-500 text-2xl font-semibold'>Joseph R.</h1>
                    <h2 className='py-2 font-semibold'>Thomas and his dog were exactly alike! Both of them were happy go-lucky guys who just wanted someone to hang with.</h2>
                    <p className='py-3 uppercase font-bold text-blue-700'>Chestnut Park</p>
                </div>

                <div className='border py-8 rounded-xl shadow-xl text-center p-6'>
                    <div className='items-center mt-[-4rem] '>
                        <img className='w-[90px] rounded-full border-2 border-yellow-400' src='https://static.vecteezy.com/system/resources/previews/004/109/207/original/faces-profile-avatars-people-expression-simple-heads-male-female-persons-cartoon-illustrations-profile-male-female-people-face-user-happy-free-vector.jpg'/>
                    </div>
                    <div>
                        <img className='w-[300px]' src='https://static.vecteezy.com/system/resources/previews/008/288/145/non_2x/woman-is-walking-with-dog-happy-girl-in-medical-mask-play-with-pet-puppy-on-a-leash-quarantine-rules-design-vector.jpg'/>
                    </div>
                    <h1 className='text-orange-500 text-2xl font-semibold'>Carmen S.</h1>
                    <h2 className='py-2 font-semibold'>I had a blast with Audrey and her dog! There was never a dull moment!</h2>
                    <p className='py-3 uppercase font-bold text-purple-700'>Pecanville Park</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default About