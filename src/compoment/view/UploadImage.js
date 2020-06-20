import React, {Component} from 'react';

class UploadImage extends Component {
	constructor(){
		super();
		this.state ={
			url: ''
		};
	}
	render() {
		var {url} = this.state;
		// if(!this.props.image)
		// {
		// 	return (
		// 		<img alt='imageproduct' src={`https://i.ibb.co/DgxJwNd/white.jpg`} id="image"/>
		// 	);
		// }
		// else
		{
			url = this.props.image;
			return (
				<img src={`${url}`} id="image"/>	
			);
		}
	}
}
export default UploadImage;
