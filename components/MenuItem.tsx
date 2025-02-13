import { ROUTES } from "@/data";
import { TDish } from "@/types";
import { useRouter } from "next/navigation";

type MenuItemProps = {
    item: TDish;
    isAuthenticated: boolean;
    onAddToCart: (dish: TDish) => void;
};

export const MenuItem: React.FC<MenuItemProps> = ({ item, isAuthenticated, onAddToCart }) => {
    const router = useRouter();

    const handleButtonClick = () => {
        if (isAuthenticated) {
            onAddToCart(item);
        } else {
            router.push(ROUTES.signin);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full transition-transform hover:scale-105">
            <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{item.dish}</h3>
                <p className="text-gray-600 mb-4 text-sm">{item.ingredients}</p>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{item.price} грн.</span>
                    <span className="text-gray-600 text-sm">В наличии: {item.quantity}</span>
                </div>
            </div>
            <button
                onClick={handleButtonClick}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 mt-auto"
            >
                {isAuthenticated ? "Добавить в корзину" : "Войти для заказа"}
            </button>
        </div>
    );
};
