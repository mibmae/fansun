import { connect } from 'react-redux';
import Cart from 'src/components/Cart';
import { modifyCart } from 'src/actions/';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    modifyCart: (payload) => {
        dispatch(modifyCart(payload));
      },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
