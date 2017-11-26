import React, { Component } from 'react';

class PageNotFound extends Component{
    constructor(props){
        super(props);
    }
    render () {
        return (
            <div className="App">
                <div className="tile home errpage">
                    <h1>Page Not Found</h1>
                    <h3>Hmm...That text doesn't seem to exist. <span onClick={this.props.back}>Go back to shambhuamitabh.com</span></h3>
                </div>
            </div> 
        );
    }
};

export default PageNotFound;