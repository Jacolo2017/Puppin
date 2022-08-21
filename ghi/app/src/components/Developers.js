import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

const Developers = () => {
  return (
    <div className="w-screen h-screen text-center py-4 mt-1" id="contact">
      <div className="py-4">
        <h2 className="text-3xl pt-8 text-gray-800 uppercase font-bold">
          Meet the
        </h2>
        <h3 className="text-5xl pt-8 text-gray-900 uppercase font-bold">
          Developers
        </h3>
      </div>

      <div className="grid grid-cols-2 w-screen gap-12 px-10 py-20">
        <div className="bg-gray-300 rounded-xl shadow-2xl">
          <div className="p-10">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQETMiOEVjx9Hg/profile-displayphoto-shrink_800_800/0/1626865528939?e=1663804800&v=beta&t=9Jzy-pJZcirCasnNRFutdU5Iyn79bgP0VqXeS8gP5-Y"
              className="rounded-full w-20 mt-[-4rem]"
            />
            <h3 className="uppercase font-bold text-center text-2xl py-4">
              Mark Esposito
            </h3>
            <p className="text-center">
              Hands-on mechanical engineer with 6+ years of experience bringing
              concepts to life. Identified 900+ issues while testing next
              generation to military logistics truck. Cut production costs by
              $400,000 for Chrysler’s premier luxury sedan. Designed
              high-profile, commercial building infrastructure at Arup.
              Demonstrates unbending work ethic grounded in military experience
              and proficient in collaborating with global, cross-disciplinary
              teams. Committed to looking for a solution, no matter how small
              the problem. Lately I have been entranced by working with data
              structures and algorithms.
            </p>
          </div>
          <div className="bg-slate-200 pl-8 py-10 mt-6 flex justify-center items-center">
            <Link to="https://www.linkedin.com/in/mjesposito3/">
              <BsLinkedin className="w-10 h-10 text-blue-700" />
            </Link>
            <div className=" px-10 text-2xl ml-4 font-semibold">
              Connect with me!
            </div>
          </div>
        </div>

        <div className="bg-gray-300 rounded-xl shadow-2xl">
          <div className="p-10">
            <img
              src="https://media-exp1.licdn.com/dms/image/C4E03AQGy0zsKhTT4Ig/profile-displayphoto-shrink_800_800/0/1654194278503?e=1663804800&v=beta&t=yL5rghfj5qNyLLaYmx6D7TfKHdsRH-dmU4aa_nr8CYk"
              className="rounded-full w-20 mt-[-4rem]"
            />
            <h3 className="uppercase font-bold text-center text-2xl py-4">
              Jack Lemieux
            </h3>
            <p className="text-center ">
              I am a mid-twenties software engineer who graduated from
              Galvanize's 19-week Hack reactor program. I have successfully
              deployed multiple apps from scratch and have a variety of
              knowledge from python to ES6 and FastAPI to RestAPI frameworks. I
              am based out of the Denver-Metro area and have worked in fields
              from construction to customer service all around the Colorado
              region. Feel free to reach out to me on LinkedIn or any of my
              other listed contact information and let's talk software
              development! We can only keep up with technology's growth if we
              are willing to learn it!
            </p>
          </div>
          <div className="bg-slate-200 pl-8 py-10 mt-6 flex justify-center items-center">
            <Link to="https://www.linkedin.com/in/jack-lemieux/?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADW9Z3oBCPl3kh1iUkHj6sH6CPRopzTladM">
              <BsLinkedin className="w-10 h-10 text-blue-700" />
            </Link>
            <div className=" px-10 text-2xl ml-4 font-semibold">
              Connect with me!
            </div>
          </div>
        </div>

        <div className="bg-gray-300 rounded-xl shadow-2xl">
          <div className="p-10">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQGR8-zm2zDSFg/profile-displayphoto-shrink_800_800/0/1658786569955?e=1664409600&v=beta&t=0Ee5oFmjYNwkQ6u8Kee_SVg9hHa-ujeU1TfQPo2gYm0"
              className="rounded-full w-20 mt-[-4rem]"
            />
            <h3 className="uppercase font-bold text-center text-2xl py-4">
              Roger Wang
            </h3>
            <p className="text-left  py-2 indent-2">
              Hello! I’m a software developer that specializes in creating APIs,
              databases, message queues, and SPAs. In juggling both education
              and work, I've found that learning parallel in both environments
              (bootcamp/internship) has strengthened my understanding of both
              new and fundamental concepts whilst simultaneously gaining
              important experiences in collaborating within scrum teams to
              address the needs and requirements of end users.
            </p>
            <p className="text-left  py-2 indent-2">
              With this balance, I felt I was able to refine and absorb
              different perspectives of programming from both an educational
              standpoint and a professional one. Furthermore, the experiences
              have hardened my ability to learn and apply different
              languages/technologies to similar problems using a monolithic yet
              flexible mindset.{" "}
            </p>
          </div>
          <div className="bg-slate-200 pl-8 py-10 mt-6 flex justify-center items-center">
            <Link to="https://www.linkedin.com/in/roger-wang-b4024113b/">
              <BsLinkedin className="w-10 h-10 text-blue-700" />
            </Link>
            <div className=" px-10 text-2xl ml-4 font-semibold">
              Connect with me!
            </div>
          </div>
        </div>

        <div className="bg-gray-300 rounded-xl shadow-2xl">
          <div className="p-10">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQFSHJsmcNyHKQ/profile-displayphoto-shrink_800_800/0/1653047500125?e=1663804800&v=beta&t=aTySCP3tZPgA7qLV5tf7fT2pN9dS3K8fy9I112Lp9d4"
              className="rounded-full w-20 mt-[-4rem]"
            />
            <h3 className="uppercase font-bold text-center text-2xl py-4">
              Cooper Edmondson
            </h3>
            <p className="text-center py-2">
              Hey! I am a 21 year old software engineer based in Georgia. All
              throughout my life I’ve had an infatuation with computers and that
              same passion is what lead me to software engineering. Software
              Engineering has been eye opening, and has shown me endless
              posabilities (and opportunities{" "}
              <span className="font-bold">;)</span> ) while allowing me to be
              creative, yet structured. I tried taking the college route but
              ultimately ended up deciding to go to Hack Reactor’s 19 week
              fully-immersive bootcamp, and honestly it was the best decision I
              have ever made.
            </p>
            <p className="text-center py-2">
              There I learned that I love working with the front-end because I
              feel like it’s where I can let my creativity shine. Being able to
              actually show people (users) what the back-end is capable of is
              one of my favorite parts of programming. Feel free to connect with
              me on Linkden!
            </p>
          </div>
          <div className="bg-slate-200 pl-8 py-10 mt-6 flex justify-center items-center">
            <Link to="https://www.linkedin.com/in/cooper-edmondson/">
              <BsLinkedin className="w-10 h-10 text-blue-700" />
            </Link>
            <div className=" px-10 text-2xl ml-4 font-semibold">
              Connect with me!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
{
  /* <div className='w-screen h-screen mt-24' id="contact">
        <div className='w-full h-[700px bg-gray-900/90 absolute'>
    
        </div>

        <div className='maw-w-[1240px] mx-auto text-white relative'>
            <div className='px-4 py-12'>
                <h2 className='text-3xl pt-8 text-slate-700 uppercase text-center'>Meet The</h2>
                <h3 className='text-5xl font-bold py-6 text-center text-black uppercase'>Developers</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-col-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
                <div className='bg-gray-200 rounded-xl shadow-2xl'>
                    <div className='p-8'>
                        <img src='https://media-exp1.licdn.com/dms/image/C5603AQETMiOEVjx9Hg/profile-displayphoto-shrink_800_800/0/1626865528939?e=1663804800&v=beta&t=9Jzy-pJZcirCasnNRFutdU5Iyn79bgP0VqXeS8gP5-Y'
                         className='w-20 rounded-full mt-[-4rem]'/>
                         <h3 className='font-bold text-3xl my-6'>Mark Esposito</h3>
                         <p>
                            Hands-on mechanical engineer with 6+ years of experience bringing concepts to life.
                            Identified 900+ issues while testing next generation to military logistics truck.
                            Cut production costs by $400,000 for Chrysler’s premier luxury sedan. Designed high-profile,
                            commercial building infrastructure at Arup. Demonstrates unbending work ethic grounded
                            in military experience and proficient in collaborating with global, cross-disciplinary teams. Committed to looking for a solution, no matter how small the problem.
                         </p>
                    </div>
                    <div className='bg-slate-100 pl-8 py-4'>
                        <a href='https://www.linkedin.com/in/mjesposito3/'><BsLinkedin className='w-8 h-10 text-blue-600'/></a>
                    </div>
                </div>

                <div className='bg-gray-200 rounded-xl shadow-2xl'>
                    <div className='p-8'>
                        <img src='https://media-exp1.licdn.com/dms/image/C4E03AQGy0zsKhTT4Ig/profile-displayphoto-shrink_800_800/0/1654194278503?e=1663804800&v=beta&t=yL5rghfj5qNyLLaYmx6D7TfKHdsRH-dmU4aa_nr8CYk'
                         className='w-20 rounded-full mt-[-4rem]'/>
                         <h3 className='font-bold text-3xl my-6'>Jack Lemieux</h3>
                         <p>
                            I am a mid-twenties software engineer who graduated from Galvanize's 19-week Hack reactor program.
                            I have successfully deployed multiple apps from scratch and have a variety of knowledge from python
                            to ES6 and FastAPI to RestAPI frameworks. I am based out of the Denver-Metro area and have worked in
                            fields from construction to customer service all around the Colorado region. Feel free to reach out
                            to me on LinkedIn or any of my other listed contact information and let's talk software development! We can only keep up with technology's growth if we are willing to learn it!
                         </p>
                    </div>
                    <div className='bg-slate-100 pl-8 py-4'>
                        <a href='https://www.linkedin.com/in/jack-lemieux/'><BsLinkedin className='w-8 h-10 text-blue-600'/></a>
                    </div>
                </div>

                <div className='bg-gray-200 rounded-xl shadow-2xl'>
                    <div className='p-8'>
                        <img src='https://media-exp1.licdn.com/dms/image/C5603AQHeKKbcwKnVRg/profile-displayphoto-shrink_800_800/0/1619729911245?e=1663804800&v=beta&t=R5sGSVqCF1gocFlOG5Jd7AQ68eebwxnDOKRcWg5p5Wo'
                         className='w-20 rounded-full mt-[-4rem]'/>
                         <h3 className='font-bold text-3xl my-6'>Roger Wang</h3>
                         <p>Summary</p>
                    </div>
                    <div className='bg-slate-100 pl-8 py-4'>
                        <a href='https://www.linkedin.com/in/roger-wang-b4024113b/'><BsLinkedin className='w-8 h-10 text-blue-600'/></a>
                    </div>
                </div>

                <div className='bg-gray-200 rounded-xl shadow-2xl'>
                    <div className='p-8'>
                        <img src='https://media-exp1.licdn.com/dms/image/C5603AQFSHJsmcNyHKQ/profile-displayphoto-shrink_800_800/0/1653047500125?e=1663804800&v=beta&t=aTySCP3tZPgA7qLV5tf7fT2pN9dS3K8fy9I112Lp9d4'
                         className='w-20 rounded-full mt-[-4rem]'/>
                         <h3 className='font-bold text-3xl my-6'>Cooper Edmondson</h3>
                         <p>Summary</p>
                    </div>
                    <div className='bg-slate-100 pl-8 py-4'>
                        <a href='https://www.linkedin.com/in/cooper-edmondson/'><BsLinkedin className='w-8 h-10 text-blue-600'/></a>
                    </div>
                </div>
            </div>
        </div>
    </div> */
}
