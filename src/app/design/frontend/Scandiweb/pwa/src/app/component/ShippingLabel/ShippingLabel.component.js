/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
import { PureComponent } from 'react';

class ShippingLabel extends PureComponent {
    static propTypes = {
        ...this.propTypes
    };

    render() {
        const { label } = this.props;
        return (
        <div block="Print">
            <button
              block="Button"
            >
            { label }
            </button>
        </div>
        );
    }
}
export default ShippingLabel;
