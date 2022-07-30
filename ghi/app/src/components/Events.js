import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import EventCard from './EventCard';
import 'swiper/css';
import 'swiper/css/free-mode';
export default function Events(){

  return(
    <div className='w-screen py-20 ' id="about">
        <div className='max-w-[1300px] mx-auto py-10 mt-1'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold uppercase'>Events</h2>
            </div>

            <div className=' grid-flow-row gap-10 px-4 py-20 text-center'>
              <Swiper
              freeMode={true}
              grabCursor={false}
              modules={FreeMode}
              className='mySwiper py-10'
              slidesPerView={3}
              spaceBetween={100}
              >

                <SwiperSlide className='pt-4 rounded-sm'>
                  <EventCard className=''/>
                </SwiperSlide>
                <SwiperSlide className='pt-4 rounded-sm'>
                  <EventCard className=''/>
                </SwiperSlide>
                <SwiperSlide className='pt-4 rounded-sm'>
                  <EventCard className=''/>
                </SwiperSlide>
                <SwiperSlide className='pt-4 rounded-sm'>
                  <EventCard className=''/>
                </SwiperSlide>
                <SwiperSlide className='pt-4 rounded-sm'>
                  <EventCard className=''/>
                </SwiperSlide>
                <SwiperSlide className='pt-4 rounded-sm'>
                  <EventCard className=''/>
                </SwiperSlide>
                


              </Swiper>
            </div>
        </div>
    </div>
  )
}