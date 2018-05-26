import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import globalConfig from 'config';
import ajax from '../../utils/ajax';
import Logger from '../../utils/Logger';
import {message, Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';
import {loginSuccessCreator} from '../../redux/Login.js';
import register from './images/register.png'
const logger = Logger.getLogger('Login');
const FormItem = Form.Item;
/**
 * 定义Login组件
 */
class Login extends React.PureComponent {

  // 这个login样式是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
  // 一般而言公司内部都会提供基于LDAP的统一登录, 用到这个登录组件的场景应该挺少的

  state = {
    username: '',  // 当前输入的用户名
    password: '',  // 当前输入的密码
    requesting: false, // 当前是否正在请求服务端接口
  };

  // controlled components

  // handleUsernameInput = (e) => {
  //   this.setState({username: e.target.value});
  // };

  // handlePasswordInput = (e) => {
  //   this.setState({password: e.target.value});
  // };

  /**
   * 处理表单的submit事件
   *
   * @param e
   */
  // handleSubmit = async(e) => {  // async可以配合箭头函数
  //   e.preventDefault();  // 这个很重要, 防止跳转
  //   this.setState({requesting: true});
  //   const hide = message.loading('正在验证...', 0);

  //   const username = this.state.username;
  //   const password = this.state.password;
  //   logger.debug('username = %s, password = %s', username, password);

  //   try {
  //     // 服务端验证
  //     const res = await ajax.login(username, password);
  //     hide();
  //     logger.debug('login validate return: result %o', res);

  //     if (res.success) {
  //       message.success('登录成功');
  //       // 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
  //       this.props.handleLoginSuccess(res.data);
  //     } else {
  //       message.error(`登录失败: ${res.message}, 请联系管理员`);
  //       this.setState({requesting: false});
  //     }
  //   } catch (exception) {
  //     hide();
  //     message.error(`网络请求出错: ${exception.message}`);
  //     logger.error('login error, %o', exception);
  //     this.setState({requesting: false});
  //   }
  // };
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // dispatch({
        //   type: 'login/login',
        //   payload: values
        // });
      }
    });
    //getFieldValue --> 获取一个输入控件的值 type: Function(fieldName: string)
    var username = form.getFieldValue('username');
    var password = form.getFieldValue('password');
    logger.debug('username = %s, password = %s', username, password);
    if(!username){
      message.error(`账号不能为空`);
    }
    if(!password){
      message.error(`密码不能为空`);
    }
    //ajax请求
    //sucess -> 系统首页
    if(username && password){
        // 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
        message.success('登录成功');
        this.props.handleLoginSuccess([
          //why?
        ]);
    }
    //fail -> catch 捕获错误
  };

  
  render() {
    // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
    //getFieldDecorator --> 用于和表单进行双向绑定
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="loginDIV">
      <div>
        <img src={register}  className='logo'/>
      </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的账号!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账号"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              <div className='remember'>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住我</Checkbox>
                )}
              </div>
              <div className='forgot'>
                <a className="login-form-forgot" href="">忘记密码</a>
              </div>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <div className='newuser'>
              新用户？<a href="">现在注册</a></div>
            </FormItem>
          </Form>

      </div>
    );
  }

}
//mapDispatchToProps，用来建立UI组件的参数到store.dispatch方法的映射
//定义了哪些用户的操作应该当做Action
const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch),
  };
};

//不需要从state中获取什么, 所以传一个null
//用于从UI组件生成容器组件
//Login是UI组件
//(null, mapDispatchToProps) -->将要生成的容器组件


const LoginForm = Form.create()(Login);

export default connect(null, mapDispatchToProps)(LoginForm);



//export default Form.create()(Login);