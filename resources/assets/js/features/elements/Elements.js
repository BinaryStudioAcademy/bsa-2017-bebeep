import React from 'react';
import InputDate from 'app/components/Controls/InputDate';
import Input from 'app/components/Controls/Input';
import Select from 'app/components/Controls/Select';

class Elements extends React.Component {
    constructor() {
        super();
        this.state = {
            date: null,
            text: '',
            text2: '',
        };
    }

    render() {
        const {date, text, text2} = this.state;
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

                <InputDate
                    id="date"
                    value={date}
                    onChange={(date) => (this.setState({date}))}
                    label="Когда"
                    error="error"
                />

                <Input
                    id="text"
                    value={text}
                    onChange={(e) => this.setState({text: e.target.value})}
                    error=""
                >Откуда</Input>

                <Input
                    id="text2"
                    value={text2}
                    ico="fa-circle-o"
                    onChange={(e) => this.setState({text2: e.target.value})}
                    error=""
                >Куда</Input>

                <Select
                    error="error"
                >
                    <option value="1">1 место</option>
                    <option value="2">2 место</option>
                </Select>
            </div>
        );
    }
}

export default Elements;
