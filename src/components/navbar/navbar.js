import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
          <nav>
            <div class="nav-wrapper teal lighten-2">
              <div class='logo-wrapper'>
                  <img class='logo center' src="data:image/png;base64,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"></img>  
                <p class="brand-logo center hide-on-small-and-down">sylv's meme generator</p>
                </div>
              <ul class='gallery-icon'>
                <li><a href=""><i class="material-icons">view_module</i></a></li>
              </ul>
            </div>
          </nav>
        )
    }
}
