// importing the necessary module to implement the "default export"
import { connect } from 'react-redux';
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import Breadcrumbs from 'Component/Breadcrumbs';
import Header from 'Component/Header';
import NotificationList from 'Component/NotificationList';

// importing all parts of original header planned to modify
import {
    BEFORE_ITEMS_TYPE,
    AFTER_ITEMS_TYPE,
    SWITCH_ITEMS_TYPE,
    mapStateToProps,
    mapDispatchToProps,
    AppRouter as SourceAppRouter
} from 'SourceRoute';

// export all unmodified exports from original file
export {
    CartPage,
    CategoryPage,
    Checkout,
    CmsPage,
    HomePage,
    MyAccount,
    NoMatchHandler,
    PasswordChangePage,
    ProductPage,
    SearchPage,
    SomethingWentWrong,
    UrlRewrites,
    MenuPage,
    BEFORE_ITEMS_TYPE,
    AFTER_ITEMS_TYPE,
    history
} from 'SourceRoute';

export const StyleGuide = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true */ 'Route/StyleGuide'));

// modify the intended part of the logic, notice, the class is also exported!
export class AppRouter extends SourceAppRouter {
    constructor(props) {
        super(props);

        this[SWITCH_ITEMS_TYPE].push(
            {
                component: <Route path="/styleguide" exact component={ StyleGuide } />,
                position: 11
            }
        );
    }

    [BEFORE_ITEMS_TYPE] = [
        {
            component: <NotificationList />,
            position: 10
        },
        {
            component: <Header />,
            position: 20
        },
        {
            component: <Breadcrumbs />,
            position: 30
        }
    ];

    [AFTER_ITEMS_TYPE] = []
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
