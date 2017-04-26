import * as firebase from 'firebase';
import { ref, firebaseAuth } from '../../index';

/*
export function saveUser (user) {
	console.log('i m in saveUser');
	return ref.child('users')
		.set({
			email: user.email,
			first: 'Kim',
			last: 'Pham'
		})
		.then(() => user)
}
*/
export function auth (email, password, first, last) {
	return firebaseAuth.createUserWithEmailAndPassword(email, password)
		.then(function(user) {
			// console.log('testing', email, password, first, last);
			var newUser = ref.child('users').push();
			newUser.set({
				email: email,
				first: first,
				last: last
			});
			alert('Your account is ready.');
		}, function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode == 'auth/weak-password') {
				alert('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
		
}
export function login (email, password) {
	console.log('i m in login/users-auth');
	console.log('email', email);
	console.log('password', password);

	return firebaseAuth.signInWithEmailAndPassword(email, password).then(function() {
		alert('Successfully signed in')
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);
		}
	});
}
export function resetPassword (email) {
	return firebaseAuth.sendPasswordResetEmail(email);
}
export function logout () {
	console.log('i m in logout/users-auth');
	return firebaseAuth.signOut().then(function() {
		alert('Successfully signed out')
	}).catch((error) => {
		var errorMessage = error.message;
		alert(errorMessage);
	});
}