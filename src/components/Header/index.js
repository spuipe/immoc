import React from "react";
import { Row, Col } from "antd";
import "./index.less";
import Util from "../../utils/utils";
import axios from "../../axios";
import { connect } from "react-redux";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            systemTime: null
        }
    }

    componentWillMount() {
        this.setState({ username: "大家好" });
        this.timer = setInterval(() => {
            let systemTime = Util.formateDate(new Date().getTime());
            this.setState({ systemTime });
        }, 1000);

        this.getWeatherData();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getWeatherData() {
        let city = "广州";
        if(!this.props.menuType){
            axios.jsonp({
                url: "http://api.map.baidu.com/telematics/v3/weather?location=" + encodeURIComponent(city) + "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
            }).then((res) => {
                if (res.status === "success") {
                    let data = res.results[0].weather_data[0];
                    this.setState({
                        dayPictureUrl: data.dayPictureUrl,
                        weather: data.weather
                    })
                }
            })
        }
    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? 
                        <Col span={6} className="logo">
                          <img src="/assets/logo-ant.svg" />
                          <span>Immoc管理系统</span>
                        </Col>  :  ""
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.username}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>

                {
                    menuType ? "" :
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">{ this.props.menuName }</Col>
                            <Col span={20} className="weather">
                                <span className="date">{this.state.systemTime}</span>
                                <span className="weather-img"><img src={this.state.dayPictureUrl} alt="" /></span>
                                <span className="weather-detail">{this.state.weather}</span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(Header);
             //connect(mapStateToProps,mapDispatchToProps)(Header);

