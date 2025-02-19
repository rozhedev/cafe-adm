import React, { FC, InputHTMLAttributes } from "react";

type FormControllerProps = InputHTMLAttributes<HTMLInputElement> & {
    wrapperClass?: string;
    htmlLabel: string;
};
export const FormController: FC<FormControllerProps> = ({ wrapperClass, id, name, htmlLabel, required, className, ...props }) => {
    return (
        <div className={`${wrapperClass}`}>
            <label htmlFor={id}>{htmlLabel}</label>
            <input
                id={id}
                name={id}
                required={required}
                className={`${className} mt-1 inp form-elem-size`}
                {...props}
            />
        </div>
    );
};
