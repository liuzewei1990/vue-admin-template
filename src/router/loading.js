import { Loading } from 'element-ui';
let loading = {};
export default (flag) => {
    console.log("loding", flag)
    if (flag) {
        loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            // background: 'rgba(0, 0, 0, 0.7)'
        });

    } else {
        loading.close();
    }
}

