const ResultBox = ({ name, imageUrl }) => {
  return (
    <div>
      {}
      <img
        src={imageUrl}
        height="200vh"
        alt={`Imagine there's a picture of ${name}`}
      ></img>
      <h2>You should eat {name}</h2>
    </div>
  );
};

export default ResultBox;
