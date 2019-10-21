import React, { Component } from 'react';

import Entry from './entry';

import './forum.css';

class Forum extends Component{
	render() {
		const {  description, entries, isAuthed, onChange, onSubmit, topic } = this.props;
		return (
			<div className='Forum'>
				{entries.map((entry) => (
					<Entry {...entry}/>
				))}
				{isAuthed && <div className = 'forBar'>
						<input value={topic} onChange={onChange} name="topic" placeholder="Topic"/>
						<textarea value={description} onChange={onChange} name="description" placeholder="Description" 
						style = {{margin:'0px', height: '75px', width: '945px'}}/>
						<button onClick={onSubmit}>Comment</button>
					</div>
				}
			</div>
		);
	}
}

export default Forum;