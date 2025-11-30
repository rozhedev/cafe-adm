import { StateAction } from "@/types";
import React, { ChangeEvent } from "react";

export type TImageForm = {
    preview: string | null;
    setPreview: StateAction<string | null>;
    file: File | null;
    setFile: StateAction<File | null>;
};

const ImageForm: React.FC<TImageForm> = ({ preview, setPreview, file, setFile }) => {
    // Обработка выбора файла и создание превью
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] as File;
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <>
            <div>
                <label
                    htmlFor="fileInput"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Выберите изображение
                </label>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>
            {/* Image preview */}
            {preview && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-auto max-h-64 object-contain rounded-lg"
                    />
                </div>
            )}
        </>
    );
};

export default ImageForm;
