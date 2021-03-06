import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Q } from '@nozbe/watermelondb';
//
// import database from '../../lib/database';
import Avatar from './Avatar';

class AvatarContainer extends React.Component {
	static propTypes = {
		text: PropTypes.string,
		type: PropTypes.string,
	};

	static defaultProps = {
		text: '',
		type: 'u'
	};

	constructor(props) {
		super(props);
		this.mounted = false;
		this.state = { avatarETag: '' };
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		if (this.subscription?.unsubscribe) {
			this.subscription.unsubscribe();
		}
	}

	init = async() => {
		// const db = database.active;
		// const usersCollection = db.collections.get('users');
		// const subsCollection = db.collections.get('subscriptions');
		//
		// let record;
		// try {
		// 	if (this.isDirect) {
		// 		const { text } = this.props;
		// 		const [user] = await usersCollection.query(Q.where('username', text)).fetch();
		// 		record = user;
		// 	} else {
		// 		const { rid } = this.props;
		// 		record = await subsCollection.find(rid);
		// 	}
		// } catch {
		// 	// Record not found
		// }
		//
		// if (record) {
		// 	const observable = record.observe();
		// 	this.subscription = observable.subscribe((r) => {
		// 		const { avatarETag } = r;
		// 		if (this.mounted) {
		// 			this.setState({ avatarETag });
		// 		} else {
		// 			this.state.avatarETag = avatarETag;
		// 		}
		// 	});
		// }
	}

	render() {
		const { avatarETag } = this.state;
		return (
			<Avatar
				avatarETag={avatarETag}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = state => ({
	user: state.login.user
});
export default connect(mapStateToProps)(AvatarContainer);
