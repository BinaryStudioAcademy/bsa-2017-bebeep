import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Elements extends React.Component {
    constructor() {
        super();
        this.state = {
            inputTextFocus: false,
            inputDateFocus: false,
            date: null,
            text: ''
        };
    }

    render() {
        const {inputTextFocus, inputDateFocus, date, text} = this.state;
        return (
            <div>
                <div> 
                    <button className="btn btn-info btn-lg">Найти</button>
                    <button className="btn btn-info btn-lg disabled">Найти</button>
                </div>
                <div>
                    <button className="btn btn-warning btn-lg">Продолжить</button>
                    <button className="btn btn-warning btn-lg disabled">Продолжить</button>
                </div>
                <label htmlFor="test" className={"form-input fa-circle-o" + (text !== '' ? ' form-input_focus' : '')}>
                    <input type="text" id="test" className="form-input__text" value={text} onChange={(e) => this.setState({text: e.target.value})}/>
                    <span className="form-input__label">Количество мест</span>
                </label>

                <label htmlFor="date" className={"form-input fa-calendar" + (date !== null || inputDateFocus ? ' form-input_focus' : '')}>
                    <div className="form-input__text">
                        <DatePicker
                            todayButton={"Today"}
                            selected={date}
                            onChange={(date) => (this.setState({date}))}
                            minDate={moment()}
                            className="form-input__text"
                            isClearable={false}
                            id="date"
                            onFocus={() => this.setState({inputDateFocus: true})}
                            onBlur={() => this.setState({inputDateFocus: false})}
                        />
                    </div>
                    <span className="form-input__label">Когда</span>
                </label>

                <div className="form-select">
                    <select className="form-select__select">
                        <option value="1">1 место</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Elements;
