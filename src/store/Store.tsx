import {create} from 'zustand';
import {produce, Producer} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import OrderHistoryScreen from '../screen/OrderHistoryScreen';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (CartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == CartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].price.length; j++) {
                  if (
                    state.CartList[i].price[j].size == CartItem.price[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(CartItem.price[0]);
                }
                state.cartList[i].price.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size > b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) state.Cartlist.push(CartItem);
            {
            }
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
