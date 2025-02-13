export type ToastProps = {
    id: string;
    message: string;
    type?: "success" | "error" | "info";
};

export type ToastPropsContextType = {
    addToast: (message: string, type?: ToastProps["type"]) => void;
    removeToast: (id: string) => void;
};
