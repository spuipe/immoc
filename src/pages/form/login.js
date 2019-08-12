import React from "react";
import {Form,Card,Input,Button, Icon,message,Checkbox} from "antd";

class Login extends React.Component {

  handleSubmit = ()=>{
     let userinfo = this.props.form.getFieldDecorator();
     this.props.form.validateFields((error,values)=>{
       if(!error){
         message.success(`${userinfo.username}登录成功`);
       }
     });
  }

    render (){
      const { getFieldDecorator } = this.props.form;
        return (
            <div>
              <Card title="行内表单">
                <Form layout="inline">
                  <Form.Item><Input placeholder="请输入用户名"></Input></Form.Item>
                  <Form.Item><Input placeholder="请输入密码"></Input></Form.Item>
                  <Form.Item><Button type="primary">登录</Button></Form.Item>
                </Form>
              </Card>

              <br/>
              <br/>

              <Card title="水平表单">
                <Form style={{width: 300}}>
                  <Form.Item>
                    {getFieldDecorator("username",{ initialValue: '',rules: [{ required: true,message: "请输入用户名" },{ min: 4,max: 10,message: "长度不在范围内" }],})(
                      <Input prefix={<Icon type="user" style={{color: "rgba(0,0,0,0.25)"}} />} placeholder="UserName"></Input>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password",{  initialValue: '',rules: [{ required: true,message: "请输入密码" }],})(
                      <Input prefix={<Icon type="lock" style={{color: "rgba(0,0,0,0.25)"}} />} placeholder="password"></Input>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("remember",{ initialValue: true,valuePropName: "checked",rules: [],})(
                      <Checkbox >记住密码</Checkbox>
                    )}
                    <a href="#" style={{ float: "right" }}>忘记密码</a>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
        );
    }
}

export default Form.create()(Login);