<template>
  <q-layout class="bg-primary" view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-toolbar-title> {{ title }} </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="info"
          aria-label="Menu"
          @click="info = !info"
        />
        <q-btn
          flat
          dense
          round
          icon="add"
          aria-label="Menu"
          @click="$router.push('/transaction')"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      class="bg-primary column text-white"
    >
      <div
        class="items-center justify-center column logo"
        style="height: 200px"
      >
        <div>KIRIM</div>
        <div>CHIQIM</div>
      </div>
      <q-scroll-area class="flex" style="height: calc(100vh - 200px)">
        <div class="text-grey-5 text-subtitle1">
          <q-list>
            <q-item
              style="border-left: 2px solid transparent"
              v-for="item in drawerItems"
              :key="item.label"
              clickable
              v-ripple
              :to="item.to"
              :active="title === item.label"
              active-class="my-menu-link"
              @click="changeLocation(item.label)"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
            <q-item
              style="border-left: 2px solid transparent"
              clickable
              v-ripple
              @click="$router.replace('/')"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Чиқиш</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-dialog v-model="info">
      <q-card style="width: 350px">
        <q-card-section>
          <div class="text-h6">Ma'lumot</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-between">
            <div>Yuborilgan pullar</div>
            <div>{{ totalInputTransactions + " so'm" }}</div>
          </div>
          <div class="row row justify-between">
            <div>Xarajatlar</div>
            <div>{{ "-" + totalOutputTransactions + " so'm" }}</div>
          </div>
          <div class="row row justify-between">
            <div>Qolgan summa</div>
            <div>
              {{ totalInputTransactions - totalOutputTransactions + " so'm" }}
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container style="height: calc(100vh - 100px)">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getDrawerItems } from "src/composable/drawerItems";
import { useRoute, useRouter } from "vue-router";
import { useTransactionStore } from "src/stores/store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "MainLayout",

  setup() {
    const { totalInputTransactions, totalOutputTransactions } = storeToRefs(
      useTransactionStore()
    );
    const $q = useQuasar();
    const drawerItems = getDrawerItems();
    var drawer = ref(false);
    const router = useRouter();
    const route = useRoute();
    const info = ref(false);
    const title = ref(route.meta.page);
    const changeLocation = (path) => {
      title.value = path.label;
      router.replace({ path: path.to });
    };
    const formatNumber = (num) => {
      //return number with spaces
      console.log(num);
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    };

    return {
      totalInputTransactions,
      totalOutputTransactions,
      formatNumber,
      info,
      drawerItems,
      title,
      changeLocation,
      drawer,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped>
.my-menu-link {
  color: white;
  border-right: 2px solid white;
  border-left: 2px solid white !important;
}
</style>
