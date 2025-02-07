import React, { FC, InputHTMLAttributes } from "react";

type FormControllerProps = InputHTMLAttributes<HTMLInputElement> & {
    htmlLabel: string;
};
export const FormController: FC<FormControllerProps> = ({ id, name, htmlLabel, required, className, ...props }) => {
    return (
        <div>
            <label htmlFor={id}>{htmlLabel}</label>
            <input
                id={id}
                name={id}
                required
                className={`${className} mt-1 inp form-elem-size`}
                {...props}
            />
        </div>
    );
};
