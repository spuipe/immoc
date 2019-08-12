import React from "react";
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message,InputNumber} from "antd";
import moment from "moment";

const TextArea = Input.TextArea;

class Register extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            userImg: ""
        }
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg: imageUrl,
              loading: false,
            }),
          );
        }
    }

    getBase64 = (img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    formSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo);
    }

    render (){
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { xs: 24,sm: 4, },
        wrapperCol: { xs: 24,sm: 20 }
      };
      const offsetLayout = {
          wrapperCol: { xs: 24,sm: { span: 12,offset: 4 } }
      };
        return (
            <div>
              <Card title="注册表单">
                <Form layout="horizontal">
                  <Form.Item label="用户名" {...formItemLayout}>  {/* required: true 自动加 *，必填 */}
                    {getFieldDecorator("username",{ initialValue: '',rules: [{ required: true,message: "请输入用户名" }],})(
                      <Input placeholder="UserName"></Input>
                    )}
                  </Form.Item>
                  <Form.Item label="密码" {...formItemLayout}>
                    {getFieldDecorator("password",{ initialValue: '',rules: [{ required: true,message: "请输入密码" }],})(
                      <Input placeholder="UserName" type="password"></Input>
                    )}
                  </Form.Item>
                  <Form.Item label="性别" {...formItemLayout}>
                    {getFieldDecorator("sex",{})(
                      <Radio.Group>
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  <Form.Item label="年龄" {...formItemLayout}>
                    {getFieldDecorator("age",{ initialValue: '18'})(
                      <InputNumber ></InputNumber>
                    )}
                  </Form.Item>
                  <Form.Item label="当前状态" {...formItemLayout}>
                    {getFieldDecorator("state",{ initialValue: 'React'})(
                      <Select>
                        <option value="React">React</option>
                        <option value="Vue">Vue</option>
                        <option value="Angular">Angular</option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="爱好" {...formItemLayout}>
                    {getFieldDecorator("hobby",{ initialValue: ["1","5"]})(
                      <Select mode="multiple">
                        <option value="1">篮球</option>
                        <option value="2">足球</option>
                        <option value="3">看电影</option>
                        <option value="4">桌球</option>
                        <option value="5">游泳</option>
                        <option value="6">踩单车</option>
                        <option value="7">健身</option>
                        <option value="8">玩游戏</option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="是否已婚" {...formItemLayout}>
                    {getFieldDecorator("isMarry",{ initialValue: true,valuePropName: "checked"})(
                      <Switch></Switch>
                    )}
                  </Form.Item>
                  <Form.Item label="生日" {...formItemLayout}>
                    {getFieldDecorator("birthday",{ initialValue: moment("2018-08-08")})(
                      <DatePicker></DatePicker>
                    )}
                  </Form.Item>
                  <Form.Item label="联系地址" {...formItemLayout}>
                    {getFieldDecorator("address",{  })(
                      <TextArea autosize={{ minRows: 3,maxRows: 6 }}></TextArea>
                    )}
                  </Form.Item>
                  <Form.Item label="早起时间" {...formItemLayout}>
                    {getFieldDecorator("wakeUpTime",{  })(
                      <TimePicker showTime format="HH:mm:ss"></TimePicker>
                    )}
                  </Form.Item>
                  <Form.Item label="头像" {...formItemLayout}>
                    {getFieldDecorator("upload",{  })(
                      <Upload listType="picture-card" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" showUploadList={false} onChange={()=>this.handleChange}>
                        {this.state.userImg ? <img src={this.state.userImg}/> : <Icon type="plus"/>}
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item  {...offsetLayout}>
                    {getFieldDecorator("protocol",{ initialValue: true,valuePropName: "checked" })(
                      <Checkbox>我已经该网站<a href="#">协议</a></Checkbox>
                    )}
                  </Form.Item>
                  <Form.Item  {...offsetLayout}>
                    {getFieldDecorator("protocol",{  })(
                      <Button type="primary" onClick={this.formSubmit}>注册</Button>
                    )}
                  </Form.Item>
                </Form>
              </Card>
            </div>
        );
    }
}

export default Form.create()(Register);
