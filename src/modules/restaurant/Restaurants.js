import React, { Component } from 'react';
import { Link } from 'react-router'
import * as firebase from 'firebase';

class Restaurants extends Component{

	constructor(){
		super();
		this.state = {restaurants:[]};
	}

	componentWillMount(){
		console.log("mounting");
		this.restaurantListRef = firebase.database().ref('restaurants');
		var that = this;

		this.restaurantListRef.on('value', function(snapshot) {
		  snapshot.forEach(function(childSnapshot) {
		    that.state.restaurants.push(childSnapshot);
		    console.log(childSnapshot.val())
		    that.setState({restaurants: that.state.restaurants})
		  });
		});
	}


	render(){
		return(
			<div>
				<h1>List of restaurant</h1>
				<Link to='restaurants/new'>New</Link>
				<div>
			      {this.state.restaurants.map((restaurant, index) =>(
				    <ul key={index}>
				    	<li>Name: <Link to={'/restaurants/' + restaurant.key}>{restaurant.val().name}</Link></li>
					    <li>Rating:{ restaurant.val().rating }/5</li>
					    <li>Address:{ restaurant.val().loc }</li>
				    </ul>))}
			    </div>
		    </div>
	)}

}

export default Restaurants;
