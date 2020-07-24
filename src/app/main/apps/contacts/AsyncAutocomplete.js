import React from 'react';

// Import the Autocomplete Component
import Autocomplete from 'react-autocomplete';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { SEARCH_USER } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export default class AsyncAutocomplete extends React.Component {
	constructor(props, context) {
		super(props, context);

		// Set initial State
		this.state = {
			// Current value of the select field
			value: '',
			// Data that will be rendered in the autocomplete
			// As it is asynchronous, it is initially empty
			autocompleteData: []
		};

		// Bind `this` context to functions of the class
		this.onChange = this.onChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.getItemValue = this.getItemValue.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
	}

	/**
	 * Updates the state of the autocomplete data with the remote data obtained via AJAX.
	 *
	 * @param {String} searchText content of the input that will filter the autocomplete data.
	 * @return {Nothing} The state is updated but no value is returned
	 */
	retrieveDataAsynchronously(searchText) {
		let _this = this;

		apiCall(
			SEARCH_USER(String(searchText)),
			{},
			res => {
				_this.setState({
					autocompleteData: res
				});
			},
			err => {
				_this.setState({
					autocompleteData: []
				});
			},
			METHOD.GET,
			getHeaderToken()
		);
	}

	/**
	 * Callback triggered when the user types in the autocomplete field
	 *
	 * @param {Event} e JavaScript Event
	 * @return {Event} Event of JavaScript can be used as usual.
	 */
	onChange(e) {
		this.setState({
			value: e.target.value
		});

		/**
		 * Handle the remote request with the current text !
		 */
		this.retrieveDataAsynchronously(e.target.value);

		// console.log('The Input Text has changed to ', e.target.value);
	}

	/**
	 * Callback triggered when the autocomplete input changes.
	 *
	 * @param {Object} val Value returned by the getItemValue function.
	 * @return {Nothing} No value is returned
	 */
	onSelect(val, item) {
		this.setState({
			value: val
		});
		this.props.onSelect(item);
		// console.log("Option from 'item' selected : ", item);
	}

	/**
	 * Define the markup of every rendered item of the autocomplete.
	 *
	 * @param {Object} item Single object from the data that can be shown inside the autocomplete
	 * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
	 * @return {Markup} Component
	 */
	renderItem(item, isHighlighted) {
		return (
			<div className="bg-white p-12 text-base" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
				{item.first_name} {item.last_name} {item.company?.name ? `(${item.company.name})` : ''}
			</div>
		);
	}

	/**
	 * Define which property of the autocomplete source will be show to the user.
	 *
	 * @param {Object} item Single object from the data that can be shown inside the autocomplete
	 * @return {String} val
	 */
	getItemValue(item) {
		// You can obviously only return the Label or the component you need to show
		// In this case we are going to show the value and the label that shows in the input
		// something like "1 - Microsoft"
		return `${item.first_name} ${item.last_name} ${item.company?.name && `(${item.company.name})`}`;
	}

	render() {
		return (
			<div className="custom-autocomplete block w-full mb-24">
				<Autocomplete
					inputProps={{ placeholder: this.props.placeholder, autoFocus: true }}
					getItemValue={this.getItemValue}
					items={this.state.autocompleteData}
					renderItem={this.renderItem}
					value={this.state.value}
					onChange={this.onChange}
					onSelect={this.onSelect}
				/>
			</div>
		);
	}
}
