import React from "react";
import { Input,Select,Form,Button,Checkbox,Radio, DatePicker } from "antd";
import Utils from "../../utils/utils";


const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{

    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        let formItemList = [];
        if(formList && formList.length >0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;

                if(item.type == "时间查询"){
                  const begin_time = <FormItem key="begin_time" label="订单时间">
                      { getFieldDecorator("begin_time")(
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间"/>
                      ) }
                    </FormItem>
                    formItemList.push(begin_time);

                    const end_time = <FormItem label="~" colon={false} key="end_time" >
                      { getFieldDecorator("end_time")(
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间"/>
                      ) }
                    </FormItem>
                    formItemList.push(end_time);
                }

                if(item.type == "INPUT" ){
                    const INPUT = <FormItem label={label} key={field} >
                      { getFieldDecorator([field],{
                          initialValue: initialValue
                      })(
                        <Input type="text" placeholder={placeholder}/>
                      ) }
                    </FormItem>
                    formItemList.push(INPUT);
                }else if(item.type == "SELECT"){
                    const SELECT = <FormItem label={label} key={field} >
                      { getFieldDecorator([field],{
                          initialValue: initialValue
                      })(
                        <Select placeholder={placeholder} style={{width: width}}>
                          { Utils.getOptionList(item.list) }
                        </Select>
                      ) }
                    </FormItem>
                    formItemList.push(SELECT);
                }else if(item.type == "CHECKBOX"){
                    const CHECKBOX = <FormItem label={label} key={field} >
                      { getFieldDecorator([field],{
                          initialValue: true,  // true | false
                          valuePropName: "checked"
                      })(
                        <Checkbox>{label}</Checkbox>
                      ) }
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }else if(item.type == "datepicker"){
                  const datepicker = <FormItem label={label} colon={false} key={field} >
                      { getFieldDecorator([field])(
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder}/>
                      ) }
                    </FormItem>
                    formItemList.push(datepicker);
              }else if(item.type == "城市"){
                const city = <FormItem label="城市" key={field} >
                    { getFieldDecorator(field,{ initialValue: initialValue })(
                      <Select placeholder={placeholder} style={{width: width}}>
                          { Utils.getOptionList(item.list) }
                        </Select>
                    ) }
                  </FormItem>
                  formItemList.push(city);
            }
            });
        }
        return formItemList;
    }

    handleSelect = ()=>{
      let fieldsValue = this.props.form.getFieldsValue();
      this.props.handleSelect(fieldsValue);
    }

    reset = ()=>{
      this.props.form.resetFields();
    }

    render (){
        return (
            <div>
               <Form layout="inline">
                  { this.initFormList() }
                  <FormItem>
                     <Button type="primary" style={{margin: "0 20px"}} onClick={ this.handleSelect }>查询</Button>
                     <Button onClick={ this.reset }>重置</Button>
                  </FormItem>
               </Form>
            </div>
        );
    }
}

export default Form.create({})(FilterForm);
