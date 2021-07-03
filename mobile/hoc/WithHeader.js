import { wrap } from 'lodash';
import React, {Component, useEffect, useState } from 'react';


const withHeader = (wrappedComponent , title) => {
    return class extends Component {
        static navigationOptions = () => {
            return {
                title: title,
                headerStyle: {
                    backgroundColor: '#007bff'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    marginHorizontal: 10,
                    textAlign: 'right',
                    flexGrow: 1
                }
            }
        }

        render() {
            return <wrappedComponent {...this.props} />
        }
    }
}


export default withHeader;