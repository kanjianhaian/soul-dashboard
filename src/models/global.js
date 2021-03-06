import { queryPlatform, getAllPlugins } from "../services/api";

export default {
  namespace: "global",

  state: {
    collapsed: false,
    platform: {
      matchModeEnums: [
        {
          code: 0,
          name: "and",
          support: true
        },
        {
          code: 1,
          name: "or",
          support: true
        }
      ],
      wafEnums: [
        {
          code: 0,
          name: "reject",
          support: true
        },
        {
          code: 1,
          name: "allow",
          support: true
        }
      ],
      pluginEnums: [
        {
          code: 1,
          name: "global",
          support: true
        },
        {
          code: 2,
          name: "sign",
          support: true
        },
        {
          code: 10,
          name: "waf",
          support: true
        },
        {
          code: 20,
          name: "rate_limiter",
          support: true
        },
        {
          code: 30,
          name: "rewrite",
          support: true
        },
        {
          code: 40,
          name: "redirect",
          support: true
        },
        {
          code: 50,
          name: "divide",
          support: true
        },
        {
          code: 60,
          name: "dubbo",
          support: true
        },
        {
          code: 70,
          name: "springCloud",
          support: true
        },
        {
          code: 80,
          name: "monitor",
          support: true
        }
      ],
      selectorTypeEnums: [
        {
          code: 0,
          name: "full flow",
          support: true
        },
        {
          code: 1,
          name: "custom flow",
          support: true
        }
      ],
      rpcTypeEnums: [
        {
          code: null,
          name: "http",
          support: true
        },
        {
          code: null,
          name: "dubbo",
          support: true
        },
        {
          code: null,
          name: "springCloud",
          support: true
        },
        {
          code: null,
          name: "motan",
          support: false
        },
        {
          code: null,
          name: "grpc",
          support: false
        }
      ],
      operatorEnums: [
        {
          code: null,
          name: "match",
          support: true
        },
        {
          code: null,
          name: "=",
          support: true
        },
        {
          code: null,
          name: ">",
          support: false
        },
        {
          code: null,
          name: "<",
          support: false
        },
        {
          code: null,
          name: "like",
          support: true
        }
      ],
      paramTypeEnums: [
        {
          code: null,
          name: "post",
          support: false
        },
        {
          code: null,
          name: "uri",
          support: false
        },
        {
          code: null,
          name: "query",
          support: false
        },
        {
          code: null,
          name: "host",
          support: true
        },
        {
          code: null,
          name: "ip",
          support: true
        },
        {
          code: null,
          name: "header",
          support: true
        }
      ],
      pluginTypeEnums: [
        {
          code: null,
          name: "before",
          support: true
        },
        {
          code: null,
          name: "function",
          support: true
        },
        {
          code: null,
          name: "last",
          support: true
        }
      ],
      loadBalanceEnums: [
        {
          code: 1,
          name: "hash",
          support: true
        },
        {
          code: 2,
          name: "random",
          support: true
        },
        {
          code: 3,
          name: "roundRobin",
          support: true
        }
      ],
      httpMethodEnums: [
        {
          code: null,
          name: "get",
          support: true
        },
        {
          code: null,
          name: "post",
          support: true
        },
        {
          code: null,
          name: "put",
          support: false
        },
        {
          code: null,
          name: "delete",
          support: false
        }
      ],
      serializeEnums: [
        {
          code: null,
          name: "jdk",
          support: true
        },
        {
          code: null,
          name: "kryo",
          support: true
        },
        {
          code: null,
          name: "hessian",
          support: true
        },
        {
          code: null,
          name: "protostuff",
          support: true
        }
      ]
    },
    plugins: []
  },

  effects: {
    *fetchPlatform(_, { call, put }) {
      const json = yield call(queryPlatform);
      if (json.code === 200) {
        yield put({
          type: "savePlatform",
          payload: json.data
        });
      }
    },
    *fetchPlugins(_, { call, put }) {
      const payload = {
        currentPage: 1,
        pageSize: 50
      };
      const json = yield call(getAllPlugins, payload);
      if (json.code === 200) {
        let { dataList } = json.data;
        yield put({
          type: "savePlugins",
          payload: {
            dataList
          }
        });
      }
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    savePlatform(state, { payload }) {
      return {
        ...state,
        platform: payload
      };
    },
    savePlugins(state, { payload }) {
      return {
        ...state,
        plugins: payload.dataList
      };
    }
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== "undefined") {
          window.ga("send", "pageview", pathname + search);
        }
      });
    }
  }
};
