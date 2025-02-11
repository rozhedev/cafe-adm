import React, { FC } from "react";
import { TDish } from "@/types";
import { FormController } from "@/ui";

type TDishForm = {
    formData: TDish;
    setFormData: any;
    formFields: Array<any>;
    dishStatus: string;
    isLoading: boolean;
    btnLoadLabel: string;
    btnDefaultLabel: string;
    onSubmit: (e: React.FormEvent) => Promise<void>;
};

export const DishForm: FC<TDishForm> = ({ formData, setFormData, formFields, dishStatus, isLoading, btnLoadLabel, btnDefaultLabel, onSubmit }) => {
    const handleChange = (fieldId: keyof TDish) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev: any) => ({
            ...prev,
            [fieldId]: e.target.value,
        }));
    };

    return (
        <form
            className="flex flex-col items-center gap-4"
            onSubmit={onSubmit}
        >
            {dishStatus && <div className="form-elem-size border-2 border-blue-300 rounded-lg shadow-md font-medium bg-blue-200 text-blue-800 p-3">{dishStatus}</div>}
            {formFields.map((field) => (
                <FormController
                    key={field.id}
                    {...field}
                    value={formData[field.id as keyof TDish]}
                    onChange={handleChange(field.id as keyof TDish)}
                />
            ))}

            <div>
                <label htmlFor="ingredients">Ингредиенты</label>
                <textarea
                    id="ingredients"
                    name="ingredients"
                    placeholder="Спагетти, сыр, мясо"
                    className="mt-1 inp form-elem-size"
                    aria-label="Ингредиенты"
                    value={formData.ingredients}
                    onChange={handleChange("ingredients")}
                />
            </div>
            <button
                type="submit"
                className="mt-4 btn btn--auth"
            >
                {isLoading ? btnLoadLabel : btnDefaultLabel}
            </button>
        </form>
    );
};
