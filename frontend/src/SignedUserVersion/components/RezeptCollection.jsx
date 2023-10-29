import { useEffect, useState } from "react";
import { Card, Button } from "flowbite-react";
import api from "../../config/api.jsx";

const fetchRezeptCollection = async (token) => {
  const authString = `Bearer ${token}`;
  console.log(authString);
  const recipeList = await fetch(`${api.BACKEND.getUrl}/recipe/user`, {
    headers: {
      Authorization: authString,
    },
    credentials: "include",
  });
  return await recipeList.json();
};

const RezeptCollection = (props) => {
  const [data, setData] = useState([]);
  const [fetchTriggerData, setFetchTriggerData] = useState(0);

  const handleDelete = (recipeId) => {
    fetch(`http://localhost:8080/recipe/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${props.user}`,
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        setFetchTriggerData(fetchTriggerData + 1);
      })
      .catch((err) => console.error(err));
    console.log(`Deleting recipe with ID: ${recipeId}`);
  };

  const handleEdit = (recipeId) => {
    console.log(`Editing recipe with ID: ${recipeId}`);
  };

  useEffect(() => {
    fetchRezeptCollection(props.user).then((data) => {
      setData(data);
    });
  }, [fetchTriggerData]);

  console.log(data);

  return (
    <div>
      {data.map((recipe) => {
        return (
          <Card key={recipe.id} className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{recipe.name}</p>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {recipe.flavourType}
            </p>
            <Button
              onClick={() => handleDelete(recipe.id)}
              className="mt-2 mr-2"
            >
              Delete
            </Button>
            <Button onClick={() => handleEdit(recipe.id)} className="mt-2">
              Edit
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default RezeptCollection;
