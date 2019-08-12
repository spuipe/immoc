import React from 'react';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App.js";
import Login from "./pages/login";
import Admin from "./admin.js";

import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notice from "./pages/ui/notice";
import Message from "./pages/ui/message";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousel from "./pages/ui/carousel";
import User from "./pages/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar";
import Pie from "./pages/echarts/pie";
import Line from "./pages/echarts/line";
import PermissionUser from "./pages/permission";

import FormLogin from "./pages/form/login";
import Register from "./pages/form/register";

import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";

import City from "./pages/city";
import RichText from "./pages/rich";

import Order from "./pages/order";

import Common from "./common";

import Nomatch from "./pages/nomatch";


import OrderDetail from "./pages/order/detail";

export default class IRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <HashRouter>
                <App>
                  <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/common" render={()=> 
                        <Common>
                           <Route path="/common/order/detial" exact component={OrderDetail} />
                        </Common>
                    }></Route>
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/ui/modals" component={Modals} />
                                <Route path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notification" component={Notice} />
                                <Route path="/ui/messages" component={Message} />
                                <Route path="/ui/tabs" component={Tabs} />
                                <Route path="/ui/gallery" component={Gallery} />
                                <Route path="/ui/carousel" component={Carousel} />

                                <Route path="/form/login" component={FormLogin} />
                                <Route path="/form/reg" component={Register} />

                                <Route path="/table/basic" component={BasicTable} />
                                <Route path="/table/high" component={HighTable} />

                                <Route path="/rich" component={RichText} />

                                <Route path="/city" component={City} />

                                <Route path="/order" component={Order} />

                                <Route path="/bikeMap" component={BikeMap} />

                                <Route path="/user" component={User} />

                                <Route path="/charts/bar" component={Bar} />

                                <Route path="/charts/pie" component={Pie} />

                                <Route path="/charts/line" component={Line} />

                                <Route path="/permission" component={PermissionUser} />

                                <Redirect to="/home" />
                                <Route component={Nomatch} />
                            </Switch>
                        </Admin>
                        }>
                    </Route>
                  </Switch>
                </App>
            </HashRouter>
        );
    }
}
