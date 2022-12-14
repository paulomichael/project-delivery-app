import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  produtos: [],
};

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    utualizarCarrinho: (state, action) => {
      state.produtos = action.payload;
    },
    setIncrementProduct: (state, { payload }) => {
      const product = state.produtos.find((p) => p.id === payload.id);

      if (product) {
        product.quantity += 1;
        state.produtos = state.produtos.map((p) => (p.id === payload.id ? product : p));
      } else {
        state.produtos.push({ ...payload, quantity: 1 });
      }
    },
    setDecrementProduct: (state, { payload }) => {
      const productId = state.produtos.findIndex((p) => p.id === payload.id);
      const product = state.produtos[productId];
      if (!product) return;

      if (product.quantity > 0) {
        product.quantity -= 1;
        if (product.quantity === 0) {
          state.produtos = state.produtos.filter((p) => p.id !== payload.id);
        } else {
          state.produtos = state.produtos.map((p) => (p.id === payload.id ? product : p));
        }
      }
    },
    setQuantityProduct: (state, { payload }) => {
      const productId = state.produtos.findIndex((p) => p.id === payload.id);
      const product = state.produtos[productId];

      if (product) {
        product.quantity = payload.quantity;
        state.produtos = state.produtos.map((p) => (p.id === payload.id ? product : p));
      } else {
        state.produtos = [...state.produtos, { ...payload, quantity: 1 }];
      }
    },
    removeProduct: (state, { payload }) => {
      state.produtos = state.produtos.filter((item) => item.id !== payload);
    },
    clearCart: (state) => { state.carrinho.produtos = []; },
  },
});

const obterCarrinho = (state) => state.carrinho.produtos;
const getProductQuantity = (id) => (state) => state.carrinho?.produtos
  ?.find((p) => p.id === id)?.quantity;
const obterValorTotal = (state) => state.carrinho.produtos
  .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

export { obterCarrinho, getProductQuantity, obterValorTotal };

export const {
  utualizarCarrinho,
  setDecrementProduct,
  setIncrementProduct,
  setQuantityProduct,
  removeProduct,
  clearCart,
} = carrinhoSlice.actions;

export default carrinhoSlice.reducer;
