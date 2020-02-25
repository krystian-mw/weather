import React from 'react'

// import { LinkContainer as Link } from 'react-router-bootstrap'
import { withRouter } from 'react-router-dom'

import {   
    Form,
    FormControl,
    // Button,
    Navbar,
    Col,
    ListGroup
} from 'react-bootstrap'

// import { FaSearch } from 'react-icons/fa'

import Axios from 'axios'

const Predictions = ({ suggestions, active, callback }) => {
    if (suggestions.length > 0) {
        let out = []
        suggestions.forEach(pred => {
            out.push(
                <ListGroup.Item
                    key={pred.key}
                    onClick={() => {
                        if (typeof callback === 'function' && pred.key !== 'NULL') callback({
                            city_name: pred.des,
                            place_id: pred.key
                        })
                    }}
                >
                    {pred.des}
                </ListGroup.Item>
            )
        })
        return (
            <ListGroup className={`Suggestions ${active}`}>
                {out}
            </ListGroup>
        )
    } else return null
}

class NavBar extends React.Component {

    state = {
        suggestions: [],
        active_class: false,
        search_box: ''
    }

    // The use of "arrow function" is to inherit the "this"
    onFormChange = (e) => {
        this.setState({
            search_box: e.target.value
        })
        // Make sure search box has at least 3 chars to avoid
        // unnecessary api calls
        if (e.target.value.length <= 3) return this.setState({
            suggestions: []
        })
        Axios.get('/api/autocomplete/' + e.target.value).then(res => {
            this.setState({
                suggestions: res.data,
                active_class: true
            })
        }).catch(err => {
            suggestions = process.env.ENV === JSON.stringify('development') ? [
                {des: 'London', key: 'ads'},
                {des: 'York', key: 'asds'},
                {des: 'Example data', key: 'eg'}
            ] : [{ des: 'Cannot find location', key: 'NULL' }]
            this.setState({ suggestions })
        })
    }

    clearSuggestions = () => {
        this.setState({
            active_class: false
        })
    }

    showHiddenSuggestions = () => {
        this.setState({
            active_class: true
        })
    }

    render () {
        return (
            <>
                <Col
                    className="NavBarCol"
                    sm="12"
                    md="6"
                    onClick={() => {
                        this.props.history.push(`/`)
                    }}
                >
                    <Navbar.Brand>
                        <img
                            src="/logo/white/icon-512x512.png"
                            className="BrandImage"
                        />
                        <span>Pogoda</span>
                    </Navbar.Brand>
                </Col>
                <Col className="NavBarCol" sm="12" md="6">
                    <Form inline onSubmit={(e) => {
                        e.preventDefault()
                        if (this.state.suggestions.length > 0) {  
                            let suggestion = this.state.suggestions[0]        
                            this.setState({
                                suggestions: [],
                                active_class: false,
                                search_box: ''
                            })                                
                            this.props.history.push(`/location/${suggestion.des}/${suggestion.key}`)                        
                        }
                    }}>
                        <FormControl
                            autoComplete="off"
                            onFocus={this.showHiddenSuggestions}
                            onBlur={this.clearSuggestions}
                            onChange={this.onFormChange}
                            id="search_field"
                            className="mr-sm-2 Focus"
                            placeholder="Miejscowość ... "
                            value={this.state.search_box}
                        />
                        <Predictions 
                            active={this.state.active_class}
                            suggestions={this.state.suggestions}
                            callback={(data) => {
                                this.setState({
                                    suggestions: [],
                                    active_class: false,
                                    search_box: ''
                                })                                
                                this.props.history.push(`/location/${data.city_name}/${data.place_id}`)
                            }}
                        />
                        {/* <Button><FaSearch /></Button> */}
                    </Form>
                </Col>
            </>
        )
    }
}

export default withRouter(NavBar)