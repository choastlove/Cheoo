// 登录成功的事件
//action creator
export const loginSuccessCreator = (userName) => {
  return {type: 'LOGIN_SUCCESS', payload: userName};
};

const initState = {
  login: false,  // 是否已登录
  userName: '未登录', // 登录后的用户名
};
//store reducer
const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      //  ...  对象展开运算符（Object Spread Operator） 
      return {...state, login: true, userName: action.payload};
    default:
      return state;
  }
};

export default {initState, reducer};

//action -> dispacth -> store -> reducer