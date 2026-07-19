import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }


  async updateNews() {

    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?q=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(url);
    console.log(parsedData);


    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false
    });

  }


  async componentDidMount() {
    this.updateNews();
  }


  async componentDidUpdate(prevProps) {

    if (
      prevProps.category !== this.props.category
    ) {

      this.setState(
        {
          page: 1
        },
        () => {
          this.updateNews();
        }
      );

    }

  }


  handlePrevClick = () => {

    this.setState(
      {
        page: this.state.page - 1
      },
      () => {
        this.updateNews();
      }
    );

  }


  handleNextClick = () => {

    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.updateNews();
      }
    );

  }


  capitalizeFirstLetter = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);

  }


  render() {


    const totalPages = Math.max(
      1,
      Math.ceil(this.state.totalResults / this.props.pageSize)
    );


    return (

      <div className="container my-3">


        <h1 className="text-center">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>


        {this.state.loading && <Spinner />}


        <div className="row">


          {!this.state.loading &&
            this.state.articles.map((element) => {

              return (

                <div className="col-md-4" key={element.url}>

                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 45)
                        : ""
                    }

                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }

                    imageUrl={element.urlToImage}

                    newsUrl={element.url}
                  />

                </div>

              )

            })

          }


        </div>



        <div className="container d-flex justify-content-between align-items-center my-3">


          <button

            disabled={this.state.page <= 1}

            type="button"

            className="btn btn-dark"

            onClick={this.handlePrevClick}

          >

            &larr; Previous

          </button>



          <span className="fw-bold">

            Page {this.state.page} of {totalPages}

          </span>



          <button

            disabled={this.state.page >= totalPages}

            type="button"

            className="btn btn-dark"

            onClick={this.handleNextClick}

          >

            Next &rarr;

          </button>


        </div>


      </div>

    );

  }

}


export default News;