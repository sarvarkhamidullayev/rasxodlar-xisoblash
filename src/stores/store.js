import { defineStore } from "pinia";
import { api } from "src/boot/axios";

const formatNumber = (num) => {
  //return number with spaces
  const number = String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  console.log(number);
  return number;
};

export const useTransactionStore = defineStore('"transactionStore"', {
  state: () => ({
    transactions: [],
    transaction: {
      amount: null,
      description: "",
      isInput: true,
    },
  }),
  getters: {
    isInputTransactions: (state) => {
      return state.transactions.filter(
        (transaction) => transaction.isInput === true
      );
    },
    isOutputTransactions: (state) => {
      return state.transactions.filter(
        (transaction) => transaction.isInput === false
      );
    },
    //get total isInput transactions
    totalInputTransactions: (state) => {
      return state.transactions.reduce((total, transaction) => {
        if (transaction.isInput === true) {
          return total + transaction.amount;
        }
        return total;
      }, 0);
    },
    totalOutputTransactions: (state) => {
      return state.transactions.reduce((total, transaction) => {
        if (transaction.isInput === false) {
          return total + transaction.amount;
        }
        return total;
      }, 0);
    },
  },
  actions: {
    async fetchTransactions() {
      const response = await api.get("/transactions");
      if (response.status === 200) {
        this.transactions = response.data.map((transaction) => {
          return {
            ...transaction,
            formattedSum: formatNumber(transaction.amount),
          };
        });
      }
    },
    async addTransaction() {
      const response = await api.post("/transactions", this.transaction);
      if (response.status === 201) {
        console.log(response.data);
        response.data.formattedSum = formatNumber(response.data.amount);
        this.transactions.push(response.data);
      }
    },
    async updateTransaction(id, transaction) {
      const response = await api.put(`/api/transactions/${id}`, transaction);
      this.transactions = response.data;
    },
    async deleteTransaction(id) {
      const response = await api.delete(`/api/transactions/${id}`);
      this.transactions = response.data;
    },
  },
});
