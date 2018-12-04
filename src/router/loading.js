import { Loading } from 'element-ui';
import store from '@src/vuex';
let loading = {};
export default (flag) => {
    console.log("loding", flag)
    if (flag) {
        store.state.loadingBar = 100;
    } else {
        store.state.loadingBar = 0;
    }
}

