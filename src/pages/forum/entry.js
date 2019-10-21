import React, { Component } from 'react';
import "./entry.css";

export class Entry extends Component {

  render() {
    const { topic, description, username } = this.props;

    return (
      <div className= "container">
        <div className = "head">
          <span>{`${username}`}</span>
        </div>
        <div className = "container-body">
          <div className = "userinfo">
            <div className = "user-head">
              <a>
                <strong>{topic}</strong>
              </a>
            </div>
              <div className = "user-container"></div>
          </div>
          <div class="postbody">
            <div class="postrow">
              <div class="content">
                <div id="post_message_51660429">
                  <blockquote class="postcontent restore ">
                  {description}</blockquote>
                </div>
              </div>
            </div>
          <div class="cleardiv"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Entry
