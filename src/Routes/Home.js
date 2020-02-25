import React from 'react'
import Axios from 'axios'

import Weather from '../Components/Weather'

export default class Home extends React.Component {

    state = {
        Component: (
            <h3>Checking where you are now ...</h3>
        )
    }

    componentDidMount () {
        Axios.get('//api.ipstack.com/check', {
            params: {
                access_key: `94119a032cabb83b9892e58d51bee837`,
                fields: `latitude,longitude`
            }
        }).then(res => {
            if (res.data.success === undefined) {
                this.setState({
                    Component: <Weather
                        longitude={res.data.longitude}
                        latitude={res.data.latitude}
                    />
                })
            } else {
                this.setState({
                    Component: (
                        <h3>
                            Could not find you by your IP address,
                            please search manually in the top bar.
                        </h3>
                    )
                })
            }
        }).catch(err => {
            this.setState({
                Component: (
                    <p>Please check your internet connection ...</p>
                )
            })
        })
    }


    render () {
        return this.state.Component
    }
}