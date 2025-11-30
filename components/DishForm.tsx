import React, { FC } from "react";
import { StringValObjMap, TDish } from "@/types";
import { FormController } from "@/ui";
import ImageForm, { TImageForm } from "./ImageForm";

type TDishForm = {
    formData: StringValObjMap; // use mapping for prevent errors
    setFormData: any;
    formFields: Array<any>;
    label: string;
    onSubmit: (e: React.FormEvent) => Promise<void>;
} & TImageForm;

export const DishForm: FC<TDishForm> = ({ formData, setFormData, formFields, label, onSubmit, preview, setPreview, file, setFile }) => {
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
                    className="resize-none mt-1 inp form-elem-size"
                    aria-label="Ингредиенты"
                    value={formData.ingredients}
                    onChange={handleChange("ingredients")}
                />
            </div>
            <ImageForm
                preview={preview}
                setPreview={setPreview}
                file={file}
                setFile={setFile}
            />

            <div className="form-elem-size">
                <button
                    type="submit"
                    className="mt-4 btn btn--accent"
                >
                    {label}
                </button>
            </div>
        </form>
    );
};
