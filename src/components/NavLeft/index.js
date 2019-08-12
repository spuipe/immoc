import React from "react";
import { NavLink } from "react-router-dom";
import menuConfig  from "../../config/menuConfig";
import { connect } from "react-redux";
import { switchMenu } from "../../redux/action";
import { Menu, Icon } from 'antd';
import "./index.less";

const { SubMenu,Item } = Menu;

class NavLeft extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            menuTreeNode: null,
            currentKey: ""
        }
    }

    componentWillMount (){
       const menuTreeNode = this.renderMenu(menuConfig);

       this.setState({menuTreeNode});

       let currentKey = window.location.hash.replace(/#|\?.*$/g,"");
       this.setState({ currentKey })
    }

    renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>{this.renderMenu(item.children)}</SubMenu>
                );
            }
            return (<Item title={item.title} key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Item>); 
        })
    }

    handleClick = ({ item,key })=>{
        this.setState({ currentKey: key });
        const { dispatch }  = this.props;  // dispatch 需要被redux管理才有
        dispatch(switchMenu(item.props.title));
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark" mode="vertical" selectedKeys={[this.state.currentKey]} onClick={this.handleClick}>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}


export default connect()(NavLeft);

