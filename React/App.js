import React from 'react'
import ReactDom from 'react-dom'

var Application = React.createClass({
    getInitialState() {
        return ({
            search: '',
            data: []
        })
    },
    render() {
        return (
            <div>
                <div id="options-form" className="ui modal small">
                  <i className="close icon"></i>
                  <div className="header">
                    Options
                  </div>
                  <div className="content">
                      <div className="ui form">
                          <h3 className="ui header">
                              Hue Lights
                          </h3>

                          <div className="ui blue button">Connect Hue Lights</div>

                          <h3 className="ui header">
                              Account
                          </h3>


                          <div className="ui checkbox">
                              <input type="checkbox" tabindex="0" className="hidden"></input>
                              <label>Checkbox</label>
                          </div>

                          <div className="ui red button">Delete Account</div>
                      </div>
                  </div>
                  <div className="actions">
                    <div className="ui black deny button">
                      Cancel
                    </div>
                    <div className="ui positive right labeled icon button">
                      Save
                      <i className="checkmark icon"></i>
                    </div>
                  </div>
                </div>

                <i id="optionsBtn" className="options icon big circular inverted"></i>
                <div id="div1" className="ui container">
                    <img id="image" src=""></img>
                    <h1 className='v'>Vibrant</h1>
                    <h2 className='0'>Palette 0</h2>
                </div>
            </div>
        )
    }
})

ReactDom.render(<Application />,
document.getElementById('react-app'))
