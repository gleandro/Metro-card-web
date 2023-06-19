import {ChangeEvent, useState} from "react";

export const useForm = (initialState: any) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    return [values, handleInputChange, reset];

}