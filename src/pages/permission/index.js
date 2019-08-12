import React from "react";
import { Card,Button,Modal,Form,Select,Input,Tree,message,Transfer  } from "antd";
import ETable from "../../components/ETable";
import Utils from "../../utils/utils";
import axios from "../../axios";
import menuList from "../../config/menuConfig";

const Option = Select.Option;
const FormItem = Form.Item;
const { TreeNode } = Tree;

export default class PermissionUser extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            isRoleVisible: false,
            isPermissionVisible: false,
            isUserVisible: false
        }
    }

    componentWillMount(){
        this.requestList();
    }

    requestList = ()=>{
        axios.requrestList(this,"/role/list",{},true)
    }

    // 创建角色的提交
    handleRoleSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({ url: "/role/create",data: { params: data } }).then((res)=>{
            if(res.code == 0){
                this.setState({ isRoleVisible: false })
                this.requestList();
                this.roleForm.props.form.resetFields();
            }
        })
    }

    // 打开创建角色弹框
    handleRole = ()=>{
        this.setState({ isRoleVisible: true });
    }

    handlePermission = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({ text: "提示",content: "请选择一个角色" });
            return;
        }
        this.setState({ isPermissionVisible: true,detailInfo: item,menuInfo: item.menus })
    }

    handlePermissionSubmit = ()=>{  // 设置权限  点击确定 触发
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;  // 角色Id
        data.menus = this.state.menuInfo;  // 用户选好的权限
        axios.ajax({ url: "/permission/edit",data: { params: {...data} } }).then((res)=>{
            if(res){
                this.setState({isPermissionVisible: false})
                this.requestList();
                message.success("权限修改成功!!!");
            }
        })
    }  

    // 用户授权
    handleUserAuth = ()=>{
        let item = this.state.selectedItem;  // 选中的行对象
        if(!item){
            Modal.info({ text: "提示",content: "请选择一个角色" });
            return;
        }
        this.getRoleUserList(item.id);
        this.setState({ isUserVisible: true,detailInfo: item });
    }

    // 获取角色用户列表
    getRoleUserList = (id)=>{
        axios.ajax({ url: "/role/user_list",data: { params: {id} } }).then((res)=>{
            if(res){
                this.getAuthUserList(res.result);
            }
        })
    }

    // 筛选目标用户
    getAuthUserList = (dataSource)=>{
        const mockData = [];
        const targetKeys = [];
        if(dataSource  && dataSource.length > 0){
            for(let i=0;i < dataSource.length;i++){
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status == 1){
                    targetKeys.push(data.key);  // 目标用户的 key 值
                }
                mockData.push(data);   // 注意：该组件会自动过滤 targetKeys 相同已选择的值  ！！！！
            }
            this.setState({ mockData,targetKeys })
        }
    }

    // 用户授权  确认
    handleUserSubmit = ()=>{
        let data = {};
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({ url: "/role/user_role_edit",data: { params: {...data} } }).then((res)=>{
            if(res.code == 0){
                this.setState({isUserVisible: false})
                this.requestList();
                message.success("设置成功");
            }
        })
    }

    render (){
        const columns = [
            { title: "角色ID",dataIndex: "id" },
            { title: "角色名称",dataIndex: "role_name" },
            { title: "创建时间",dataIndex: "create_time" },
            { title: "使用状态",dataIndex: "status",render(status){
                return status == 1 ? "启用" : "停用";
            } },
            { title: "授权时间",dataIndex: "authorize_time" },
            { title: "授权人",dataIndex: "authorize_user_name" }
        ]
        return (
            <div>
               <Card>
                  <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                  <Button type="primary" style={{marginLeft: 10}} onClick={this.handlePermission}>设置权限</Button>
                  <Button type="primary" style={{marginLeft: 10}} onClick={this.handleUserAuth}>用户授权</Button>
               </Card>
               <div>
                  <ETable columns={columns} dataSource={this.state.list} updateSelectedItem={Utils.updateSelectedItem.bind(this)} selectedRowKeys={this.state.selectedRowKeys} />
               </div>

               <Modal title="创建角色" visible={this.state.isRoleVisible} onOk={this.handleRoleSubmit} onCancel={()=>{
                   this.setState({ isRoleVisible: false });
                   this.roleForm.props.form.resetFields();
                }}>
                  <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}></RoleForm>
               </Modal>

               <Modal title="设置权限" visible={this.state.isPermissionVisible} width={600} onOk={this.handlePermissionSubmit} onCancel={()=>{ this.setState({ isPermissionVisible: false }) }}>
                  <PermEditForm detailInfo={this.state.detailInfo} patchMenuInfo={(checkedKeys)=>{this.setState({  menuInfo: checkedKeys})}} menuInfo={this.state.menuInfo} wrappedComponentRef={(inst)=>this.permForm=inst} />
               </Modal>

               <Modal title="用户授权"  visible={this.state.isUserVisible}  width={800}  onOk={this.handleUserSubmit}  onCancel={()=>{ this.setState({isUserVisible: false}) }}>
                 <RoleAuthForm   detailInfo={this.state.detailInfo}  targetKeys={this.state.targetKeys}   mockData={this.state.mockData}   wrappedComponentRef={(inst)=>this.userAuthForm=inst} patchUserInfo={(targetKeys)=>{this.setState({ targetKeys })}}  />
               </Modal>
            </div>
        );
    }
}

class RoleForm extends React.Component{

    render (){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
               <FormItem label="用户名" {...formItemLayout}>
                  {
                      getFieldDecorator("role_name")(
                          <Input type="text" placeholder="请输入角色名称"/>
                      )
                  }
               </FormItem>
               <FormItem label="状态" {...formItemLayout}>
                  {
                      getFieldDecorator("status")(
                         <Select>
                            <Option value="1">开启</Option>
                            <Option value="0">关闭</Option>
                         </Select>
                      )
                  }
               </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);


class PermEditForm extends React.Component{

    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                   {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key} />
            }
        })
    }

    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys); // 父组件设置选中的菜单，再返回给子组件
    }

    render (){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               <Form layout="horizontal">
                  <FormItem label="角色名称" {...formItemLayout}>
                     <Input disabled placeholder={detail_info.role_name} />
                  </FormItem>
                  <FormItem label="状态" {...formItemLayout}>
                     {
                         getFieldDecorator("status",{
                             initialValue: 1
                         })(
                             <Select>
                                <Option value="1">启用</Option>
                                <Option value="0">停用</Option>
                             </Select>
                         )
                     }
                  </FormItem>

                  <Tree checkable defaultExpandAll onCheck={(checkedKeys)=>{ this.onCheck(checkedKeys) }} checkedKeys={menuInfo}>
                     <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuList)}
                     </TreeNode>
                  </Tree>
               </Form>
            </div>
        );
    }
}
PermEditForm = Form.create({})(PermEditForm);


class RoleAuthForm extends React.Component{

    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys); // 父组件设置选中的菜单，再返回给子组件
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    // 点击保存
    handleChange = (targetKeys)=>{   // 单向流通：将targetKeys传给父组件，再由父组件传回来
        this.props.patchUserInfo(targetKeys);
    }

    render (){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               <Form layout="horizontal">
                  <FormItem label="角色名称" {...formItemLayout}>
                     <Input disabled placeholder={detail_info.role_name} />
                  </FormItem>
                  
                  <FormItem label="选择用户" {...formItemLayout}>
                     <Transfer dataSource={this.props.mockData}  titles={["待选用户","已选用户"]}  locale={{searchPlaceholder:"请输入用户名"}} showSearch  filterOption={this.filterOption}  targetKeys={this.props.targetKeys}  render={item=>item.title}  listStyle={{width:200,height:300}}   onChange={this.handleChange} />
                  </FormItem>
               </Form>
            </div>
        );
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);