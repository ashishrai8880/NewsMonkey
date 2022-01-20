import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {

        let { title, description, imageUrl, newsUrl, author, day, source } = this.props;
        return (
            <div className='d-flex justify-content-center my-3'>
                <div className="card d-flex justify-content-center" style={{ width: "18rem" }}>

                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'86%' , zIndex: '1'}}>
                        {source}

                    </span>

                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text" ><small className="text-danger">By {author ? author : "Unknown"} on {(new Date(day)).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
