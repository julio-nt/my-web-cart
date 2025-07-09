interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {};

export default CartItem;
