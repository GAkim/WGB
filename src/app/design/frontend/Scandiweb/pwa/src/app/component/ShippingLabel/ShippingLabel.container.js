import DataContainer from 'Util/Request/DataContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShippingLabel from './ShippingLabel.component';

class ShippingLabelContainer extends DataContainer {
    static propTypes = {
        label: PropTypes.string.isRequired
    };

    render() {
        console.log(this.props)
        return (
            <ShippingLabel
              { ...this.props }
            />
        );
    }
}
export default connect(null, null)(ShippingLabelContainer);

