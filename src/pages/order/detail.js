import React from "react";
import { Card, Button, Table, Form, Select, Modal, message,DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import "./detail.less";

export default class OrderDetail extends React.Component {

   constructor (props){
      super(props);

      this.state = {

      };
   }

   componentWillMount(){
      let orderId = this.props.location.search.substring(9);
      if(orderId){this.getDetailInfo();}
   }

   getDetailInfo = (orderId) => {
      axios.ajax({ url: "/order/detail",data: { params: {orderId: orderId} } }).then((res)=>{
         if(res.code == 0){
            this.setState({ orderInfo: res.result })
            this.renderMap(res);
         }
      });
   }

   renderMap = (res)=>{
      this.map = new window.BMap.Map("orderDetailMap",{enableMapClick: true});

      this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT  }));
      this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT  }));
      this.map.addControl(new window.BMap.OverviewMapControl());

      // 绘制行驶路线
      this.drawBikeRoute(res.result.position_list);
      // 绘制服务区
      this.drawServiceArea(res.result.area);
   }

   // 绘制用户行驶路线
   drawBikeRoute = (positionList)=>{
      let map = this.map;
      let startPoint = "";
      let endPoint = "";

      if(positionList.length > 0){
         let arr = positionList[0];

         // 开始坐标
         startPoint =  new window.BMap.Point(arr.lon,arr.lat);
         let startIcon =  new window.BMap.Icon("/assets/start_point.png",new window.BMap.Size(36,42),{ 
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(36,42) 
         });

         let startMarker = new window.BMap.Marker(startPoint,{ icon: startIcon });
         this.map.addOverlay(startMarker);  // 添加到地图上

         // 结束坐标
         endPoint =  new window.BMap.Point(positionList[positionList.length-1].lon,positionList[positionList.length-1].lat);
         let endIcon =  new window.BMap.Icon("/assets/end_point.png",new window.BMap.Size(36,42),{ 
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(36,42) 
         });
         let endMarker = new window.BMap.Marker(endPoint,{ icon: endIcon });
         this.map.addOverlay(endMarker);  // 添加到地图上

         // 连接路线图
         let trackPoint = [];
         for(let i=0;i<positionList.length;i++){
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon,point.lat));
         }
         let polyline =  new window.BMap.Polyline(trackPoint,{
            strokeColor: "#1869AD", // 线的颜色
            strokeWeight: 3,  // 线的宽度
            strokeOpacity: 1  // 线的透明度
         });
         this.map.addOverlay(polyline);
         
         this.map.centerAndZoom(endPoint,13);  // 设置中心点坐标和地图缩放级别

      }
   }

   // 绘制服务区
   drawServiceArea = (area)=>{
      // 连接路线图
      let trackPoint = [];
      for(let i=0;i<area.length;i++){
         let point = area[i];
         trackPoint.push(new window.BMap.Point(point.lon,point.lat));
      }
      let polygon =  new window.BMap.Polygon(trackPoint,{
         strokeColor: "#CE0000", // 线的颜色
         strokeWeight: 4,  // 线的宽度
         strokeOpacity: 1,  // 线的透明度
         fillColor: "#ff8605",  // 填充的颜色
         fillOpacity: 0.4, // 填充的透明度    
      });
      this.map.addOverlay(polygon);
   }


    render (){
       const info = this.state.orderInfo || {};
        return (
            <div>
               <Card>
                  <div id="orderDetailMap" className="order-map"></div>
                  <div className="detail-items">
                     <div className="item-title">基础信息</div>
                     <ul className="detail-form">
                        <li>
                           <div className="detail-form-left">用车模式</div>
                           <div className="detail-form-content">{ info.mode == 1 ? "服务区" : "停车点" }</div>
                        </li>
                        <li>
                           <div className="detail-form-left">订单编号</div>
                           <div className="detail-form-content">{info.order_sn}</div>
                        </li>
                        <li>
                           <div className="detail-form-left">车辆编号</div>
                           <div className="detail-form-content">{info.bike_sn}</div>
                        </li>
                        <li>
                           <div className="detail-form-left">用户姓名</div>
                           <div className="detail-form-content">{info.user_name}</div>
                        </li>
                        <li>
                           <div className="detail-form-left">手机号码</div>
                           <div className="detail-form-content">{info.mobile}</div>
                        </li>
                     </ul>
                  </div>

                  <div className="detail-items">
                     <div className="item-title">行驶轨迹</div>
                     <ul className="detail-form">
                        <li>
                           <div className="detail-form-left">行驶起点</div>
                           <div className="detail-form-content">{info.start_location}</div>
                        </li>
                        <li>
                           <div className="detail-form-left">行程终点</div>
                           <div className="detail-form-content">{info.end_location}</div>
                        </li>
                        <li>
                           <div className="detail-form-left">行驶里程</div>
                           <div className="detail-form-content">{info.distance/1000 + "公里"}</div>
                        </li>
                     </ul>
                  </div>
               </Card>
            </div>
        );
    }
}
