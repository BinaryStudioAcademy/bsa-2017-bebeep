import React from 'react';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import { Input, InputAutocomplete, InputDateTime, Select } from 'app/components/Controls';

class Elements extends React.Component {
    constructor() {
        super();
        this.state = {
            date: null,
            text: '',
            text2: '',
            selected: 'foo'
        };
    }

    render() {
        const { date, text, text2, selected } = this.state;
        console.log(selected);
        return (
            <ContainerWrapper>
                <div>
                    <button className="btn btn-info btn-lg">Найти</button>
                    <button className="btn btn-info btn-lg disabled">Найти</button>
                </div>
                <div>
                    <button className="btn btn-warning btn-lg">Продолжить</button>
                    <button className="btn btn-warning btn-lg disabled">Продолжить</button>
                </div>

                <InputDateTime
                    id="date"
                    value={date}
                    timeFormat={false}
                    onChange={(date) => (this.setState({date}))}
                    labelClasses="form-input fa-calendar"
                    label="Когда"
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

                <InputAutocomplete
                    id="autocomplete"
                    value={selected}
                    items={[
                        { name_id: 1, name: 'foo' },
                        { name_id: 2, name: 'bar' },
                        { name_id: 3, name: 'baz' },
                    ]}
                    onChange={(e) => { this.setState({selected: e.target.value}) }}
                    onSelected={(value, item) => console.log([value, item])}
                    transformer={(item) => ({
                        id: item.name_id,
                        label: item.name
                    })}
                >Brand car</InputAutocomplete>
            </ContainerWrapper>
        );
    }
}

export default Elements;
