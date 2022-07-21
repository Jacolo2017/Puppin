import React from 'react'

const About = () => {
  return (
    <div className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Looking for an event with trusted dog owners?</h2>
                <p className='text-3xl py-6 text-gray-700'>
                    Then, Purely Puptonic is for you! We want to create an enviorment
                    where you don't have to worry about dogs or owners misbehaving.
                </p>
            </div>

            <div className='grid md:grid-cols-3 gap-3 px-2 text-center'>
                
                <div className='border py-8 rounded-xl shadow-xl'>
                    <p className='text-3xl '>100%</p>
                    <p>User Satisfaction</p>
                </div>
            
                <div className='border py-8 rounded-xl shadow-xl'>
                    <p className='text-3xl '>100%</p>
                    <p>Honesty</p>
                </div>

                <div className='border py-8 rounded-xl shadow-xl'>
                    <p className='text-3xl '>100%</p>
                    <p>Fun</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default About