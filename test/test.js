const path = require('path');
const fs = require('fs');
const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')));
require('babel-register')(babelConfig);
const completeModule = require('../state-management-composer/core/complete-module').default;
const result = completeModule({
    namespace: 'seller',
    mapTargetsToModule: ['order', 'commodity'],
    mapTypesToModule: [
        'GET_ORDER_LIST',
        'GET_COMMODITY_LIST',
        'CHANGE_SEARCH_TYPE',
        'CHANGE_COMMODITY_SEARCH_TYPE',
        'USER_TYPE'
    ],
    mapDefinitionToModule(types) {
        return {
            state: {
                order: {
                    filterData: {
                        orderType: '',
                        orderStatus: '',
                        key: '',
                        pageNo: 1,
                        pageSize: 10,
                    },
                    total: 0
                },
                commodity: {
                    filterData: {
                        key: '',
                        pageNo: 1,
                        pageSize: 10,
                    },
                    total: 0
                },
                user: {
                    supplierRoleId: '0',
                    phone: '',
                    companyId: ''
                }
            },
            getters: {
                order(state) {
                    return state.order;
                },
                commodity(state) {
                    return state.commodity;
                },
                user(state) {
                    return state.user;
                }
            },
            mutations: {
                [types.CHANGE_SEARCH_TYPE](state, payload) {
                    state.order.filterData = Object.assign({}, state.order.filterData, payload);
                },
                [types.CHANGE_COMMODITY_SEARCH_TYPE](state, payload) {
                    state.commodity.filterData = Object.assign({}, state.commodity.filterData, payload);
                },
                [types.USER_TYPE](state, payload) {
                    state.user = Object.assign({}, state.user, data);
                }
            },
            actions: {
                async [types.GET_ORDER_LIST]({ commit, state }) {
                    // let requestData = state.order.filterData;
                    // commit(types.SET_ORDER_LOADING);
                    // await axios({
                    //     url: API.Get_Order_List,//API 提取到统一常量文件里
                    //     method: 'post',
                    //     data: requestData
                    // }).then(({ data }) => {
                    //     if (data.code === 200) {
                    //         commit(types.SET_ORDER_SUCCESS, {
                    //             data: {
                    //                 data: {
                    //                     orderList: data.list,
                    //                 },
                    //                 total: data.pageInfo.totalRecord,
                    //                 loaded: true
                    //             }
                    //         });
                    //     } else {
                    //         //错误日志报告
                    //     }
                    // }).catch(error => {
                    //     //错误日志报告

                    //     //同时触发failure mutation
                    //     commit(types.SET_ORDER_FAILURE, {
                    //         error
                    //     })
                    // });
                },
                async [types.GET_COMMODITY_LIST]({ commit, state }, requestData) {
                    // commit(types.SET_COMMODITY_LOADING);
                    // await axios(
                    //     {
                    //         method: 'post',
                    //         url: API.Get_Commodity_List,//API 提取到统一常量文件里
                    //         data: requestData
                    //     }
                    // ).then(({ data }) => {
                    //     if (data.code === 200) {
                    //         commit(types.SET_COMMODITY_SUCCESS, {
                    //             data: {
                    //                 data: {
                    //                     commodityList: data.list,
                    //                 },
                    //                 total: data.pageInfo.totalRecord,
                    //                 loaded: true
                    //             }
                    //         });
                    //     } else {
                    //         //错误日志报告
                    //     }
                    // }).catch(error => {
                    //     //错误日志报告

                    //     //同时触发failure mutation
                    //     commit(types.SET_COMMODITY_FAILURE, {
                    //         error
                    //     })
                    // });
                }
            }
        }
    }
})
console.log(result.result.state.order);
console.log(result.result.mutations['SET_SUCCESS'].toString());

