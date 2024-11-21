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
            if (found == false) {
              state.Cartlist.push(CartItem);
            }
          }),
        ),
      calculateCartPrice: () => {
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.cartList.lenght; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.cartList[i].price.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.cartList[i].price.price[j].price) *
                    state.cartList[i].price.price[j].quantity;
              }
              state.CartList[i].itemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        );
        addToFavoriteList: (type: string, id: string) =>
          set(
            produce(state => {
              if ((type = 'Coffee')) {
                for (let i = 0; i < state.CoffeeList.length; i++) {
                  if (state.CoffeeList[i].id == id) {
                    if (state.CoffeeList[i].favorite == false) {
                      state.CoffeeList[i].favorite = true;
                      state.FavoritesList.unshift(state.CoffeeList[i]);
                    }
                    break;
                  }
                }
              } else if ((type = 'Bean')) {
                for (let i = 0; i < state.BeanList.length; i++) {
                  if (state.BeanList[i].id == id) {
                    if (state.BeanList[i].favorite == false) {
                      state.BeanList[i].favorite = true;
                      state.FavoritesList.unshift(state.BeansList[i]);
                    }
                    break;
                  }
                }
              }
            }),
          );
      },
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favorite == true) {
                    state.CoffeeList[i].favorite = false;
                  }
                  break;
                }
              }
            } else if (type == 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id == id) {
                  if (state.BeanList[i].favorite == true) {
                    state.BeanList[i].favorite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.lenght; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
