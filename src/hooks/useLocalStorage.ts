import { useMoment } from '@ntdsk/react-ui';

type CartItem = { name: string; price: number; quantity: number };

type Cart = { id: number; item: CartItem[] };

type LocalStorageFields = 'session' | 'name' | 'cart';

type LocalStorage = {
  session: Date;
  name?: string;
  cart: Cart[];
};

type GetItemResult = LocalStorage | Date | string | { id: number; item: CartItem[] }[] | undefined;

const useLocalStorage = () => {
  const { momentFn } = useMoment();

  const getItem = (key?: LocalStorageFields): GetItemResult => {
    const item = localStorage.getItem('my_web_cart');
    const itemParsed: LocalStorage = item ? JSON.parse(item) : null;
    if (!key || !itemParsed) return itemParsed;
    const itemToReturn = itemParsed[key];
    return itemToReturn;
  };

  const setItem = ({ key, value }: { key: LocalStorageFields; value: string | Date | CartItem[] }) => {
    const localData = getItem();
  };

  const saveCartItem = (newCart: CartItem, group?: number) => {
    const cartList = getItem('cart') ? (getItem('cart') as Cart[]) : [];
    const currentCart = cartList.find((cart) => cart.id === group);
    if (!currentCart || currentCart.item?.length === 0) {
      return;
    }

    currentCart.item?.map((cart) => {
      if (cart.name === newCart.name) {
        return newCart;
      }
      return cart;
    });
  };

  const isSessionExpired = () => {
    const sessionTimeRaw = getItem('session') as Date;
    if (!sessionTimeRaw) return true;

    const sessionTime = momentFn(sessionTimeRaw);
    const currentTime = momentFn();

    const diffInDays = currentTime.diff(sessionTime, 'days');
    return diffInDays >= 7;
  };

  return { isSessionExpired, getItem };
};

export default useLocalStorage;
