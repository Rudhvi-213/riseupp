// import {Link} from 'react-router-dom'

import { Component } from "react";
import { BsSearch } from "react-icons/bs";
import { LuSunrise } from "react-icons/lu";
import { TailSpin as Loader } from "react-loader-spinner";
import ImageItem from "../ImageItem/index.js";
import TabItem from "../TabItem/index.js";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const searchList = [
  { tabId: "Mountain" },
  { tabId: "Flowers" },
  { tabId: "Beaches" },
  { tabId: "Cities" },
];

class Home extends Component {
  state = {
    searchInput: "",
    apiStatus: apiStatusConstants.initial,
    imageList: [],
  };

  componentDidMount = () => {
    this.getImages();
  };

  getImages = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const { searchInput } = this.state;

    let url;

    if (searchInput === "") {
      url = `https://api.unsplash.com/photos?client_id=u6jgHnqq6sYBbr3y6sxyeWSTiZcYiKhxe7QwNyI-HZs&count=30`;
      const response = await fetch(url);
      if (response.ok) {
        const fetchedData = await response.json();

        const updatedData = fetchedData.map((eachImage) => ({
          id: eachImage.id,
          createdAt: eachImage.created_at,
          updatedAt: eachImage.updated_at,
          width: eachImage.width,
          height: eachImage.height,
          color: eachImage.color,
          likes: eachImage.likes,
          description: eachImage.description,
          url: eachImage.urls.small,
          user: {
            id: eachImage.user.id,
            username: eachImage.user.username,
            name: eachImage.user.name,
            profileImage: eachImage.user.profile_image.small,
          },
        }));

        console.log(updatedData);

        this.setState({
          apiStatus: apiStatusConstants.success,
          imageList: updatedData,
        });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } else {
      url = `https://api.unsplash.com/search/photos?client_id=u6jgHnqq6sYBbr3y6sxyeWSTiZcYiKhxe7QwNyI-HZs&query=${searchInput}&page=${2}&per_page=${20}`;
      const response = await fetch(url);
      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData);

        const total = fetchedData.total;
        const totalPages = fetchedData.total_pages;
        const updatedData = fetchedData.results.map((eachImage) => ({
          id: eachImage.id,
          createdAt: eachImage.created_at,
          updatedAt: eachImage.updated_at,
          width: eachImage.width,
          height: eachImage.height,
          color: eachImage.color,
          likes: eachImage.likes,
          description: eachImage.description,
          url: eachImage.urls.small,
          user: {
            id: eachImage.user.id,
            username: eachImage.user.username,
            name: eachImage.user.name,
            profileImage: eachImage.user.profile_image.small,
          },
        }));

        console.log(updatedData);

        this.setState({
          apiStatus: apiStatusConstants.success,
          imageList: updatedData,
        });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    }
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      this.getImages();
    }
  };

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="job_fetch_failure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry_oops_button"
        onClick={this.getImages}
        type="button"
      >
        Retry
      </button>
    </div>
  );

  renderNoImages = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">No Images Found</h1>
      <p>We could not find any images. Try searching anything else</p>
    </div>
  );

  renderImages = () => {
    const { imageList, searchInput } = this.state;

    if (imageList.length === 0) {
      return this.renderNoImages();
    }
    return (
      <div>
        <h1>{searchInput}</h1>
        <hr />
        <ul className="images_container">
          {imageList.map((eachImage) => (
            <ImageItem key={eachImage.id} imageDetails={eachImage} />
          ))}
        </ul>
      </div>
    );
  };

  renderCheckApiStatus = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderImages();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  clickTabItem = (tabValue) => {
    this.setState({ searchInput: tabValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getImages();
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="home">
        <form className="form_container" onSubmit={this.handleSubmit}>
          <LuSunrise className="logo_size" />
          <div className="search_input_container">
            <input
              value={searchInput}
              type="search"
              className="search_input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              className="search_button"
              data-testid="searchButton"
              onClick={this.getImages}
              aria-label="Search"
              type="submit"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <ul className="tab_container">
            {searchList.map((eachInput) => (
              <TabItem
                key={eachInput.tabId}
                tabDetails={eachInput}
                clickTabItem={this.clickTabItem}
                isActive={searchInput === eachInput.tabId}
              />
            ))}
          </ul>
        </form>
        {this.renderCheckApiStatus()}
      </div>
    );
  }
}

export default Home;
