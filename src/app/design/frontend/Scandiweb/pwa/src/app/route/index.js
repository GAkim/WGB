// importing the necessary module to implement the "default export"
import { connect } from 'react-redux';
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import Header from 'Component/Header';
import MyAccountWishlist from 'Component/MyAccountMyWishlist';
import ContactPage from 'Component/ContactPage';
import NotificationList from 'Component/NotificationList';
import NavigationTabs from 'Component/NavigationTabs';

import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import { ConfigDispatcher } from 'Store/Config';
import { CartDispatcher } from 'Store/Cart';
import { WishlistDispatcher } from 'Store/Wishlist';
import { ContactInfoDispatcher } from 'Store/ContactInfo';

import Store from 'Store';
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
            },
            {
                component: <Route path="/my-favorites" exact component={ MyAccountWishlist } />,
                position: 90
            },
            {
                component: <Route path="/contact-us" exact component={ ContactPage } />,
                position: 95
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
            component: <NavigationTabs />,
            position: 25
        }
    ];

    [AFTER_ITEMS_TYPE] = [];

    getHeaderAndFooterOptions() {
        return {
            footer: { identifiers: this.getCmsBlocksToRequest() }
        };
    }

    dispatchActions() {
        WishlistDispatcher.updateInitialWishlistData(Store.dispatch);
        CartDispatcher.updateInitialCartData(Store.dispatch);
        ConfigDispatcher.handleData(Store.dispatch);
        HeaderAndFooterDispatcher.handleData(Store.dispatch, this.getHeaderAndFooterOptions());
        ContactInfoDispatcher.handleData(Store.dispatch, this.getContactInfoOptions());
    }

    getContactInfoOptions() {
        return { identifiers: ['contact-us-social'] };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
