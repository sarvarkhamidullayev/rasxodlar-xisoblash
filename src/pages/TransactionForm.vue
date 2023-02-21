<template>
  <q-page-container class="q-pa-none" style="padding: 0px">
    <q-page class="fit bg-secondary">
      <q-form @submit="onSubmit" @reset="onReset" class="q-py-md">
        <q-input
          dark
          filled
          required
          class="bg-primary q-ma-md q-pa-none"
          type="number"
          v-model="transaction.amount"
          label="Summani kiriting"
        />

        <q-input
          filled
          type="text"
          dark
          required
          class="bg-primary q-ma-md q-pa-none"
          v-model="transaction.description"
          label="Nimadir yozing"
          :rules="[]"
        />
        <div class="row justify-center">
          <q-toggle
            v-model="transaction.isInput"
            checked-icon="check"
            color="red"
            :label="
              transaction.isInput
                ? 'Kirim qoshmoqchimisz?'
                : 'Xarajat qoshmoqchimisz?'
            "
            unchecked-icon="clear"
          />
        </div>
        <div class="row justify-end q-ma-md">
          <q-btn
            label="Bekor qilish"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="Saqlash" type="submit" color="primary" />
        </div>
      </q-form> </q-page
  ></q-page-container>
</template>
<script>
import { defineComponent } from "vue";
import { useTransactionStore } from "src/stores/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const { transaction } = storeToRefs(useTransactionStore());
    const { addTransaction } = useTransactionStore();
    const router = useRouter();

    function onSubmit() {
      console.log(transaction.value);
      addTransaction();
      router.go(-1);
    }
    function onReset() {
      router.replace("/wallet");
    }
    return {
      onSubmit,
      onReset,
      transaction,
    };
  },
});
</script>
