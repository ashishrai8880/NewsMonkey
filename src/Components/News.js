import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }
    articles = []

    constructor(props) {
        super(props);
        // console.log("Hello I am a constructor");
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults : 0
        }
        document.title = "NewsMonkey - " + this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
    }

    // async use liye kiya hai ki ye wait kre
    async componentDidMount() {
        this.updateNews();
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category={this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }


    fetchMoreData = async () =>  {
        this.setState({page : this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category={this.props.category}&apiKey=c43e80e0e0ea4c90ba6911d73d4c2d71&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
      };

    render() {
        // console.log("render fucntion cosntructor k baad chalega or iske baad componentDidMount() chalega");
        return (
            <div className='container my-4' >
                <h1 style={{ marginTop: "80px" }} className='text-center ' >NewsMonkey - <span className="badge bg-secondary"> Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</span></h1>
                <hr />
                {this.state.loading && <Loader/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loader/>}
                >
                    <div className="row my-4">
                        {this.state.articles.map((element) => {
                            // jab bhi map function use krte hai to hume ek unique cheez batani padti hai
                            return <div className="col col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} day={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div >

                </InfiniteScroll>

                
            </div>

        )
    }
}

export default News
