export const TripCreateValidator = {
    vehicle_id: function vehicle_id(data) {
            const valid = data !== "";
            let error = valid ? "" : 'Please select a car';
            return {
                valid,
                error
            };
    },
    start_at: function start_at(data) {
            let today = new Date();
            const valid = data >= Math.round(today.setHours(today.getHours() +1) / 1000);
            let error = valid ? "" : 'The trip should begin at least an hour later';
            return {
                valid,
                error
            };
    },
    end_at: function end_at(data) {
        let today = new Date();
        const valid = data >= Math.round(today.setHours(today.getHours() +2) / 1000);
        let error = valid ? "" : "End trip time is required and should end at least an hour later start time";
        return {
            valid,
            error
        };
    },
    from: function from(data) {
        const valid = typeof data === 'object';
        let error = valid ? "" : 'Enter trip start point';
        return {
            valid,
            error
        };
    },
    to: function to(data) {
        const valid = typeof data === 'object';
        let error = valid ? "" : 'Enter trip endpoint';
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
    }
};

export const TripValidate = (data = {
    vehicle_id: "",
    start_at: "",
    end_at: "",
    from: "",
    to: "",
    price: "",
    seats: ""
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
            storeResult(result, TripCreateValidator[field](data[field]), field);
        }
        console.log(result);
        return result;
};

const TripService = {
    TripCreateValidator,
    TripValidate
};

export default TripService;