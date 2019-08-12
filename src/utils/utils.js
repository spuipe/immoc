import React from "react";
import { Select } from "antd";

const Option = Select.Option;

export default {
    formateDate(time){
        if(!time)return "";
        let date = new Date(time);
        let month = date.getMonth()+1;
        return date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },
    pagination (data,callback){
        return {
            onChange: (current)=>{
                callback(current)
            },
            current: data.result.page,  // 当前页数
            total: data.result.total,  // 数据总数
            pageSize: data.result.pageSize, // 每页条数
            showTotal: ()=>{  // 用于显示数据总量和当前数据顺序
                return `共${data.result.total}条数据`;
            },
            showQuickJumper: true,  // 是否可以快速跳转至某页
        };
    },

    getOptionList (data){
        if(!data){return [];}

        let options = [];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
        })
        return options;
    },

    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    }
}