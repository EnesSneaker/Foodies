import { useState, useEffect } from "react";
import api from "../../config/api.jsx";

const postUserFood = async (postBody, token) => {
  const authString = `Bearer ${token}`;
  const response = await fetch(`${api.BACKEND.getUrl}/recipe/post`, {
    method: "POST",
    headers: {
        Authorization: authString,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(postBody),
    credentials: "include",
  });

  return await response.json();
};

const getUnitsForDd = async () => {
  const response = await fetch(`${api.BACKEND.getUrl}/recipe/units`, {
    method: "GET",
    headers: {},
  });
  return await response.json();
};

const PostForm = (props) => {
  const [inputs, setInputs] = useState({
    steps: [],
    ingredients: [],
    comments: [],
  });
  const [stepInput, setStepInput] = useState();
  const [commentInput, setCommentInput] = useState();
  const [ingredientInput, setIngredientInput] = useState({});
  const [checked, setChecked] = useState([true, false]);
  const [DdUnits, setDdUnits] = useState(["", ""]);

  useEffect(() => {
    getUnitsForDd(DdUnits, setDdUnits).then((res) => setDdUnits(res));
  }, []);


    const handleSubmit = () =>{
        let cleanIngredientInput = inputs.ingredients.map( ingredient => ({
          ...ingredient,
          "unit": ingredient.unit.toUpperCase()
        }));
        let postBody = {
            name: `${inputs.name}`,
            ingredients: cleanIngredientInput,
            steps : inputs.steps,
            comments : inputs.comments,
            flavourType : `${checked[0] ? "SWEET"
                        : checked[1] ? "SAVOURY" : ""}`
        }
        console.log(postBody)
        console.log(props.user)
        postUserFood(postBody, props.user)
            .then( (response) => console.log(response));
    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
  };
  const addStepLine = () => {
    let moreSteps = [...inputs.steps, stepInput];
    setInputs({ ...inputs, steps: moreSteps });
    setStepInput("");
  };
  const addCommentLine = () => {
    let moreComments = [...inputs.comments, commentInput];
    setInputs({ ...inputs, comments: moreComments });
    setCommentInput("");
  };
  const addIngredientLine = () => {
    let moreIngredients = [...inputs.ingredients, ingredientInput];
    setInputs({ ...inputs, ingredients: moreIngredients });
    setIngredientInput("");
  };
  const handleIngredientInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    setIngredientInput({ ...ingredientInput, [id]: value });
    console.log(ingredientInput);
  };
  const handleStepInput = (e) => {
    setStepInput(e.target.value);
  };
  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSweet = () => {
    setChecked([true, false]);
  };
  const handleSavoury = () => {
    setChecked([false, true]);
  };

  return (
    <>
      <form /*onSubmit={handleSubmit}*/>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleInput}
          />
        </label>

        <ol>
          {inputs.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ol>
        <label>
          Ingredients:
          <input
            type="number"
            name="amount"
            value={ingredientInput.amount || ""}
            onChange={handleIngredientInput}
          />
          <select
            onChange={handleIngredientInput}
            name="unit"
            value={ingredientInput.unit || ""}
          >
            {DdUnits.map((unit, index) => (
              <option key={index}>{unit.toLowerCase()}</option>
            ))}
          </select>
          <input
            type="text"
            name="name"
            value={ingredientInput.name || ""}
            onChange={handleIngredientInput}
          />
          <input type="button" value={"+"} onClick={addIngredientLine} />
        </label>

        <ol>
          {inputs.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <label>
          Next Step:
          <input
            type="text"
            name="steps"
            value={stepInput || ""}
            onChange={handleStepInput}
          />
          <input type="button" value={"+"} onClick={addStepLine} />
        </label>

        <ol>
          {inputs.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ol>
        <label>
          Comments:
          <input
            type="text"
            name="comments"
            value={commentInput || ""}
            onChange={handleCommentInput}
          />
          <input type="button" value={"+"} onClick={addCommentLine} />
        </label>

        <label>
          Sweet:
          <input
            type="checkbox"
            onChange={handleSweet}
            checked={checked[0]}
            value={"Sweet"}
          />
        </label>
        <label>
          Savoury:
          <input
            type="checkbox"
            onChange={handleSavoury}
            checked={checked[1]}
            value={"Savoury"}
          />
        </label>

        <input type="button" onClick={handleSubmit} value={"Submit"} />
      </form>

      {/*}
                <FormGroup>
                    <Input placeholder={"Enter a name!"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input placeholder={"Enter an img-Link!"} value={imgLink} onChange={(e) => setImgLink(e.target.value)}/>
                    <FormControlLabel control={<CheckBox checked={checked[0]} onChange={handleBreakfast}/>} label={"Breakfast"} />
                    <FormControlLabel control={<CheckBox checked={checked[1]} onClick={handleLunch}/>} label={"Lunch"} />
                    <FormControlLabel control={<CheckBox checked={checked[2]} onClick={handleDinner}/>} label={"Dinner"} />
                    <Button onClick={handleSubmit}>Save it!</Button>
                </FormGroup>

            {*/}
    </>
  );
};

export default PostForm;
