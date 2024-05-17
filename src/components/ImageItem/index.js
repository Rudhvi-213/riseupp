import "./index.css";

const ImageItem = (props) => {
  const { imageDetails } = props;
  const { width, height, likes, description, url, user } = imageDetails;
  const { username, name, profileImage } = user;

  return (
    <li className="image_container">
      <img className="image" src={url} alt="image" />
      <div className="image_info_container">
        <h3>Photo Info</h3>
        <p>{description}</p>
        <p>Likes {likes}</p>
        <p>
          {width}x{height}
        </p>
        <h3>Photo Posted By</h3>
        <div className="photo_owner">
          <img className="profile_pic" src={profileImage} alt="profile-image" />
          <div>
            <p>username: {username}</p>
            <p>Full Name: {name}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ImageItem;
