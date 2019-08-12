import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";
import Utils from "../utils/utils"

export default class Axios {

    static requrestList (_this,url,params,isMock){
        var data = {
            params: params
        }
        this.ajax({ url, data },isMock).then((res)=>{
            if(res && res.result){
                let list = res.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                })
                _this.setState({
                    list: list,
                    pagination: Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static jsonp (options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param: "callback"
            },(err,res)=>{
                if(res.status === "success"){
                    resolve(res);
                }else{
                    reject(res.message);
                }
            })
        })
    }

    static ajax (options,isMock){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById("ajaxLoading");
            loading.style.display = "block";
        }
        let baseApi = "https://www.easy-mock.com/mock/5d35799145fdee58de44300a/mockTestApi";
        // if(isMock){
        //     baseApi = "https://www.easy-mock.com/mock/5d35799145fdee58de44300a/mockTestApi";
        // }else{
        //     baseApi = "服务器地址";
        // }
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method: "get",
                baseURL: baseApi,
                timeout: 20000,
                params: (options.data && options.data.params) || ""
            }).then((res)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = "none";
                }
                if(res.status == '200'){
                    let data = res.data;
                    if(data.code == '0'){
                        resolve(data);
                    }else{
                        Modal.info({ title: "提示",content: res.message });
                    }
                }else{
                    reject(res.data)
                }
            })
        })
    }
}