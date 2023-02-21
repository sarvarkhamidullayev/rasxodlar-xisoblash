<template>
  <q-page-container class="q-pa-none" style="padding: 0px">
    <q-page class="fit bg-secondary">
      <q-card class="fit">
        <q-tabs
          v-model="tab"
          class="bg-primary text-grey-5"
          active-color="white"
          indicator-color="white"
          align="justify"
        >
          <q-tab name="kirim" label="Tushgan pullar" />
          <q-tab name="chiqim" label="Xarajatlar" />
        </q-tabs>

        <q-tab-panels
          v-model="tab"
          animated
          class="bg-secondary fit text-white"
        >
          <q-tab-panel class="q-pa-none" name="kirim">
            <q-scroll-area style="height: calc(100vh - 100px)">
              <q-list>
                <q-item
                  v-for="item in isInputTransactions"
                  :key="item._id"
                  class="q-ma-sm bg-primary rounded-borders"
                  clickable
                  v-ripple
                >
                  <q-item-section>
                    <q-item-label class="text-h6 row justify-between">
                      <div class="">
                        {{ item.formattedSum + " so'm" }}
                      </div>
                      <div>
                        {{ moment(item.date).format("DD.MM.YYYY") }}
                      </div>
                    </q-item-label>
                    <q-item-label class="text-white" caption lines="2">
                      {{ item.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel class="q-pa-none" name="chiqim">
            <q-scroll-area style="height: calc(100vh - 100px)">
              <q-list>
                <q-item
                  v-for="item in isOutputTransactions"
                  :key="item._id"
                  class="q-ma-sm bg-primary rounded-borders"
                  clickable
                  v-ripple
                >
                  <q-item-section>
                    <q-item-label class="text-h6 row justify-between">
                      <div class="text-red">
                        {{ "-" + item.formattedSum + " so'm" }}
                      </div>
                      <div>
                        {{ moment(item.date).format("DD.MM.YYYY") }}
                      </div>
                    </q-item-label>
                    <q-item-label class="text-white" caption lines="2">
                      {{ item.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { ref } from "vue";
import { useTransactionStore } from "src/stores/store";
import { storeToRefs } from "pinia";
import moment from "moment";

export default {
  // name: "Transactions",
  setup() {
    const {
      transactions,
      isInputTransactions,
      isOutputTransactions,
      getTotalSum,
    } = storeToRefs(useTransactionStore());
    const { fetchTransactions } = useTransactionStore();
    const tab = ref("kirim");
    fetchTransactions();
    return {
      tab,
      moment,
      transactions,
      getTotalSum,
      isInputTransactions,
      isOutputTransactions,
    };
  },
};
</script>
