import React from 'react'
import ReactDom from 'react-dom'

let Options = React.createClass({
    getInitialState() {
        return {

        }
    },
    closeOptions() {
        $('#options-form').toggle();
    },
    showHueOptions(light) {
        if (light) {
            return (
                <Light
                    key={light.id}
                    light={light}
                    parent={this.props.parent} ></Light>
            )
        } else {
            return (
                <div className="ui blue button">Connect Hue Lights</div>
            )
        }
    },
    render() {
        return (
            <div id="options-form" className="ui modal small">
              <i className="close icon" onClick={this.closeOptions}></i>
              <div className="header">
                Options
              </div>
              <div className="content">
                  <div className="ui form">
                      <h3 className="ui header">
                          Hue Lights
                      </h3>

                      {_.map(this.props.parent.state.user.hueLights, this.showHueOptions)}

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
                <div className="ui positive right labeled icon button" onClick={this.closeOptions}>
                  Save
                  <i className="checkmark icon"></i>
                </div>
              </div>
            </div>
        )
    }
})

var Light = React.createClass({
    getInitialState() {
        return {
            light: this.props.light,
            checked: this.props.light.activated,
            parent: this.props.parent
        }
    },
    updateLight() {
        //TODO: write to database
        this.setState({checked: !this.state.checked})
        this.state.parent.setState({})
        //this.props.parent.setState({user.})
    },
    render() {
        let light = this.state.light
        let checked = this.state.checked
        console.log(this.state.parent)
        return (
            <div>
                <div className='ui checkbox'></div>
                <input type="checkbox" tabindex="0" className="hidden" checked={checked} onChange={this.updateLight}></input>
                <label>{light.name}</label>
            </div>
        )
    }
})

export default Options
