import { useMoment } from '@ntdsk/react-ui';

export type CartItem = { name: string; price: number; quantity: number };
export type Cart = { id: number; item: CartItem[] };
type LocalStorageFields = 'session' | 'name' | 'cart' | 'theme';

type LocalStorage = {
  session: Date;
  name?: string;
  cart: Cart[];
  theme?: 'light' | 'dark';
};

type GetItemResult = LocalStorage | Date | string | Cart[] | undefined;

const useLocalStorage = () => {
  const { momentFn } = useMoment();

  const getItem = (key?: LocalStorageFields): GetItemResult => {
    const item = localStorage.getItem('my_web_cart');
    const parsed: LocalStorage = item ? JSON.parse(item) : null;
    if (!key || !parsed) return parsed;
    return parsed[key];
  };

  const setItem = ({ key, value }: { key: LocalStorageFields; value: string | Date | Cart[] }) => {
    const current = (getItem() as LocalStorage) || { session: new Date(), cart: [] };
    const updated = { ...current, [key]: value };
    localStorage.setItem('my_web_cart', JSON.stringify(updated));
  };

  const saveCartItem = (newItem: CartItem, groupId: number) => {
    const cartList = (getItem('cart') as Cart[]) || [];
    const existingGroup = cartList.find((c) => c.id === groupId);

    if (existingGroup) {
      const existingItemIndex = existingGroup.item.findIndex((i) => i.name === newItem.name);
      if (existingItemIndex !== -1) {
        existingGroup.item[existingItemIndex] = newItem;
      } else {
        existingGroup.item.push(newItem);
      }
    } else {
      cartList.push({ id: groupId, item: [newItem] });
    }

    setItem({ key: 'cart', value: cartList });
  };

  const removeCartItem = ({ key, name, groupId }: { key: LocalStorageFields; name: string; groupId: number }) => {
    const cartList = (getItem('cart') as Cart[]) || [];
    const existingGroupIndex = cartList.findIndex((c) => c.id === groupId);

    if (existingGroupIndex !== -1) {
      const group = cartList[existingGroupIndex];
      const updatedItems = group.item.filter((item) => item.name !== name);

      if (updatedItems.length > 0) {
        cartList[existingGroupIndex] = { ...group, item: updatedItems };
      } else {
        cartList.splice(existingGroupIndex, 1);
      }

      setItem({ key: 'cart', value: cartList });
    }
  };

  const resetCart = () => {
    setItem({ key: 'cart', value: [] });
    setItem({ key: 'session', value: new Date() });
  };

  const isSessionExpired = () => {
    const sessionTimeRaw = getItem('session') as Date;
    if (!sessionTimeRaw) return true;
    const sessionTime = momentFn(sessionTimeRaw);
    const currentTime = momentFn();
    return currentTime.diff(sessionTime, 'days') >= 7;
  };

  return { isSessionExpired, getItem, setItem, saveCartItem, removeCartItem, resetCart };
};

export default useLocalStorage;
