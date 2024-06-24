import React from "react";
import minus from "../../imgs/minus.svg";
import {Input, TimePicker, Calendar} from "antd";
import plus from "../../imgs/plus.svg";

function Schedule() {
    return (
        <div className="py-[30px] px-[48px] rounded-[7px] bg-white">
            <h3 className="text-[18px] font-bold mb-[10px]">Расписание</h3>
            <div className='flex gap-[24px]'>
                <div className="h-full flex justify-start gap-[30px] bg-[#F1F3F4] rounded-[7px] p-[20px]">
                    <div className="w-[285px]">
                        <Calendar fullscreen={false} />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="mb-4">
                            <p className="text-[14px] font-bold mb-[10px]">Перерыв между интервью</p>
                            <div className='h-[44px] w-[200px] flex items-center justify-between p-[10px] bg-white rounded-[7px]'>
                                <button className="border-none shadow-none"><img src={minus} /></button>
                                <Input className="border-none shadow-none text-[16px] w-[90px]" defaultValue="15 минут" />
                                <button className="border-none shadow-none"><img className="w-[24px]" src={plus} /></button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[14px] font-bold mb-[10px]">Количество интервью в день</p>
                            <div className='h-[44px] w-[200px] flex items-center justify-between p-[10px] bg-white rounded-[7px]'>
                                <button className="border-none shadow-none"><img src={minus} /></button>
                                <Input className="border-none shadow-none text-[16px] w-[110px]" defaultValue="1 интервью" />
                                <button className="border-none shadow-none"><img className="w-[24px]" src={plus} /></button>
                            </div>
                        </div>
                        <div className="mt-[10px] w-[200px]">
                            <p className="text-[14px] font-bold mb-[10px]">Рабочий день</p>
                            <TimePicker.RangePicker className=" h-[44px] rounded-[7px] border-none" />
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[350px]">
                    <p className="text-[14px] mb-[8px]">Яндекс календарь API</p>
                    <Input className="h-[48px] rounded-[12px] text-[16px] border-[C1C7CD] mb-[16px]" placeholder="Яндекс календарь API" />
                </div>
            </div>
        </div>
    )
}

export default Schedule;