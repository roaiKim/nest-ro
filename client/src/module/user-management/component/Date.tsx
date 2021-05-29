import {DatePicker, TimePicker} from 'antd';
import React from 'react';
import dayjs from 'dayjs';

export default class DateTest extends React.PureComponent {
    onChange = () =>{
        
    }

    render(){

        return <>
            <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
            <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')}/>
        </>
    }
}