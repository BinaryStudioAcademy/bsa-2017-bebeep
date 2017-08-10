export const TripCreateValidator = {
    vehicle_id: function vehicle_id(data) {
            const valid = data.trim() !== "";
            let error = valid ? "" : 'Please select a car';
            return {
                valid,
                error
            };
    },
    start_at: function start_at(data) {
            let today = new Date();
            const valid = data <= today.setHours(today.getHours() +1);
            let error = valid ? "" : 'The trip should begin at least an hour later';
            return {
                valid,
                error
            };
    },
    price: function price(data) {
            const valid = data > 0;
            let error = valid ? "" : 'Trip price must be more that 0';
            return {
                valid,
                error
            };
    },
    seats: function seats(data) {
            const valid = data > 0;
            let error = valid ? "": 'Trip price must be more that 0';
            return {
                valid,
                error
            };
    },
    from: function from(data) {
            const valid = data.length > 0;
            let error = valid ? "" : 'Select trip from point';
            return {
                valid,
                error
            };
    },
    to: function to(data) {
            const valid = data.length > 0;
            let error = valid ? "" : 'Select trip to point';
            return {
                valid,
                error
            };
    }
};

export const TripValidate = (data = {
    vehicle_id: "",
    start_at: "",
    price: "",
    seats: "",
    from: "",
    to: ""
}) => {
        let result = {
                valid: true,
                errors: {}
        };
        let storeResult = (result, valid, field) => {
                result.valid = result.valid && valid.valid;
                if (!result.valid) {
                        result.errors[field] = valid.error;
                    }
                return result;
            };
        for (let field of Object.keys(data)) {
            console.log(data[field]);
            //storeResult(result, TripCreateValidator[field](data[field]), field);
        }
        return result;
    };

const TripService = {
    TripCreateValidator,
    TripValidate
};

export default TripService;