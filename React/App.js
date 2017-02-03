import React from 'react'
import ReactDom from 'react-dom'
import Options from './components/Options.js'

var Application = React.createClass({
    getInitialState() {
        return ({
            user: []
        })
    },
    componentWillMount() {
        this.getUser()
    },
    getUser() {
        let component = this
        $.get('/api/user/1').done((user) => {
            component.setState({user})
        })
    },
    displayOptions() {
        $('#options-form').toggle();
    },
    render() {
        return (
            <div>
                <Options
                    parent={this}></Options>

                <i id="optionsBtn" className="options icon big circular inverted" onClick={this.displayOptions}></i>
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
