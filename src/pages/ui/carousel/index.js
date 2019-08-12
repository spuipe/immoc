import React from "react";
import {Card,Carousel} from "antd";
import "./index.less";

export default class Carousels extends React.Component {

    render (){
        return (
            <div>
              <Card title="文字背景轮播">
                <Carousel autoplay effect="fade">
                  <div><h2>React</h2></div>
                  <div><h2>Angular</h2></div>
                  <div><h2>Vue</h2></div>
                </Carousel>
              </Card>
              <Card title="图片背景轮播"  className="slide-wrap">
                <Carousel autoplay effect="fade">
                  <div><img src="/carousel-img/carousel-1.jpg" alt=""/></div>
                  <div><img src="/carousel-img/carousel-2.jpg" alt=""/></div>
                  <div><img src="/carousel-img/carousel-3.jpg" alt=""/></div>
                </Carousel>
              </Card>
            </div>
        );
    }
}

