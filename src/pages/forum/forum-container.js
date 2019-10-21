import React from 'react';
import Forum from './forum';

const localStorage = window.localStorage;

class ForumContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      topic:'',
			description:'',
    }
  }

  handleForumSubmit = (e) => {
    fetch('http://localhost:8081/forum/', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')					
      },
      body: JSON.stringify({
        topic: this.state.topic,
        description: this.state.description,
      }),
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log('SERVER MESSAGE: ', data.message);
        this.setState((state) => ({
          entries: [data.forumData, ...state.entries]
        }));
    }).catch((err) => {
        if (err) {
            throw new Error(err);
        }
    })
  }

	componentDidMount() {
		fetch('http://localhost:8081/forum/', {
			method: 'get',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}).then((response) => {
			return response.json()
		}).then((data) => {
        console.log('FORUM GET SERVER DATA: ', data);
        this.setState({
          entries: data.forumData.reverse()
        })
		}).catch((err) => {
				if (err) {
						throw new Error(err);
				}
    });    
	}

  handleInputChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render() {
    const isAuthed = !!localStorage.getItem('token');
    return (
      <Forum 
        {...this.state} 
        isAuthed={isAuthed} 
        onChange={this.handleInputChange} 
        onSubmit={this.handleForumSubmit}
      />
    )
  }
}

export default ForumContainer;
